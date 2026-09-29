from fastapi import APIRouter, Request
import stripe

from app.core.config import settings

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/stripe")
async def stripe_webhook(request: Request) -> dict:
    payload = await request.body()
    signature = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(payload, signature, settings.STRIPE_WEBHOOK_SECRET)
    except ValueError:
        return {"status": "error", "message": "Invalid payload"}
    except stripe.error.SignatureVerificationError:
        return {"status": "error", "message": "Invalid signature"}

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        metadata = session.get("metadata", {})
        return {
            "status": "received",
            "event_type": event["type"],
            "product_id": metadata.get("product_id"),
            "user_id": metadata.get("user_id"),
            "checkout_session_id": session.get("id"),
            "message": "Payment verified and license creation can be triggered here.",
        }

    return {"status": "received", "event_type": event["type"]}
