from fastapi import APIRouter

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/stripe")
async def stripe_webhook() -> dict:
    return {"status": "received", "message": "Stripe webhook received. Implement verification and processing next."}
