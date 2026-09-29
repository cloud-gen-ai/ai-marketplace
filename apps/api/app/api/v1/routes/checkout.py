from fastapi import APIRouter

router = APIRouter(prefix="/checkout", tags=["checkout"])


@router.post("/session")
async def create_checkout_session() -> dict:
    return {
        "status": "created",
        "checkout_url": "https://example.com/checkout/demo",
        "message": "Stripe checkout session placeholder. Wire real Stripe session creation in the next phase.",
    }
