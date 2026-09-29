from fastapi import APIRouter, Request

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.post("/stripe")
async def stripe_webhook(request: Request) -> dict:
    payload = await request.json()
    return {
        "status": "received",
        "event_type": payload.get("type", "unknown"),
        "event_id": payload.get("id", "unknown"),
    }
