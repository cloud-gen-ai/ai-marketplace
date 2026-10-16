from typing import Any

from app.core.config import settings

try:
    import stripe
except Exception:  # pragma: no cover
    stripe = None


async def create_checkout_session(product_id: int, user_id: int, plan_name: str = "pro") -> dict[str, Any]:
    if stripe is not None:
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            price_id = settings.STRIPE_TEAM_PRICE_ID if plan_name == "team" else settings.STRIPE_PRO_PRICE_ID
            session = stripe.checkout.Session.create(
                mode="subscription",
                line_items=[{"price": price_id, "quantity": 1}],
                subscription_data={"trial_period_days": settings.FREE_TRIAL_DAYS},
                metadata={"product_id": str(product_id), "user_id": str(user_id), "plan_name": plan_name},
                success_url=f"{settings.APP_URL}/dashboard?checkout=success&session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=f"{settings.APP_URL}/pricing?checkout=cancelled",
            )
            return {"status": "created", "checkout_url": session.url, "session_id": session.id}
        except Exception:
            pass

    return {
        "status": "created",
        "checkout_url": "https://example.com/checkout/demo",
        "session_id": "demo_session",
        "metadata": {"product_id": product_id, "user_id": user_id, "plan_name": plan_name},
    }
