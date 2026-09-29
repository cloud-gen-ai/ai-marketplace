from fastapi import APIRouter, Request, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
import stripe
import hmac
import hashlib

from app.core.config import settings
from app.core.database import get_db
from app.services.subscription_service import activate_subscription_from_stripe, cancel_user_subscription

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


def verify_stripe_signature(payload: bytes, signature: str) -> dict:
    """
    Verify Stripe webhook signature to ensure authenticity.
    This prevents spoofed payment events.
    """
    try:
        expected_sig = hmac.new(
            settings.STRIPE_WEBHOOK_SECRET.encode(),
            payload,
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(signature, expected_sig):
            raise ValueError("Invalid signature")
        return {"valid": True}
    except Exception as exc:
        raise ValueError(f"Signature verification failed: {str(exc)}") from exc


@router.post("/stripe")
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)) -> dict:
    """
    Handle Stripe webhooks for checkout and subscription events.
    Core flow:
    1. checkout.session.completed → create subscription + grant license
    2. customer.subscription.updated → update subscription status
    3. customer.subscription.deleted → revoke license access
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    if not sig_header:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing stripe-signature header")

    try:
        verify_stripe_signature(payload, sig_header)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e)) from e

    event = None
    try:
        import json
        event = json.loads(payload)
    except json.JSONDecodeError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON")

    event_type = event.get("type")
    event_data = event.get("data", {}).get("object", {})

    # Handle checkout.session.completed → subscription + license
    if event_type == "checkout.session.completed":
        session_id = event_data.get("id")
        metadata = event_data.get("metadata", {})
        user_id = int(metadata.get("user_id", 0))
        product_id = int(metadata.get("product_id", 0))
        plan_name = metadata.get("plan_name", "pro")
        stripe_subscription_id = event_data.get("subscription")

        if not all([user_id, product_id, stripe_subscription_id]):
            return {"status": "error", "message": "Missing metadata for license creation"}

        try:
            subscription = await activate_subscription_from_stripe(
                db=db,
                user_id=user_id,
                product_id=product_id,
                stripe_subscription_id=stripe_subscription_id,
                plan_name=plan_name,
            )
            return {
                "status": "success",
                "event_type": event_type,
                "message": "Subscription activated and license created",
                "subscription_id": subscription.id,
                "session_id": session_id,
            }
        except Exception as exc:
            return {
                "status": "error",
                "event_type": event_type,
                "message": f"License creation failed: {str(exc)}",
            }

    # Handle customer.subscription.deleted → revoke license
    elif event_type == "customer.subscription.deleted":
        metadata = event_data.get("metadata", {})
        user_id = int(metadata.get("user_id", 0))
        product_id = int(metadata.get("product_id", 0))

        if user_id and product_id:
            try:
                result = await cancel_user_subscription(
                    db=db,
                    user_id=user_id,
                    product_id=product_id,
                )
                return {
                    "status": "success",
                    "event_type": event_type,
                    "message": "Subscription cancelled and license revoked",
                    "result": result,
                }
            except Exception as exc:
                return {
                    "status": "error",
                    "event_type": event_type,
                    "message": f"Cancellation failed: {str(exc)}",
                }

    return {"status": "received", "event_type": event_type}
