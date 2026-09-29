from fastapi import APIRouter, HTTPException, status

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])

SUBSCRIPTIONS = [
    {
        "id": 1,
        "user_id": 1,
        "product_id": 1,
        "plan_name": "Pro",
        "status": "active",
        "stripe_subscription_id": "sub_demo_001",
        "current_period_end": "2026-10-29T00:00:00Z",
        "created_at": "2026-09-29T00:00:00Z",
    }
]


@router.get("")
async def list_subscriptions() -> dict:
    return {"items": SUBSCRIPTIONS, "total": len(SUBSCRIPTIONS)}


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_subscription(payload: dict) -> dict:
    item = {
        "id": len(SUBSCRIPTIONS) + 1,
        "user_id": payload.get("user_id", 1),
        "product_id": payload.get("product_id", 1),
        "plan_name": payload.get("plan_name", "starter"),
        "status": payload.get("status", "active"),
        "stripe_subscription_id": payload.get("stripe_subscription_id", "sub_demo_local"),
        "current_period_end": payload.get("current_period_end", "2026-10-29T00:00:00Z"),
        "created_at": "2026-09-29T00:00:00Z",
    }
    SUBSCRIPTIONS.append(item)
    return item
