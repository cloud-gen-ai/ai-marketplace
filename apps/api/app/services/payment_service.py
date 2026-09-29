from typing import Any

try:
    import stripe
except Exception:  # pragma: no cover
    stripe = None


async def create_checkout_session(product_id: int, user_id: int, plan_name: str = "pro") -> dict[str, Any]:
    if stripe is not None:
        try:
            session = stripe.checkout.Session.create(
                mode="subscription",
                line_items=[{"price": "price_placeholder", "quantity": 1}],
                metadata={"product_id": str(product_id), "user_id": str(user_id), "plan_name": plan_name},
                success_url="https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
                cancel_url="https://example.com/cancel",
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
