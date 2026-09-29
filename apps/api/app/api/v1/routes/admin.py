from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/overview")
async def admin_overview() -> dict:
    return {
        "total_products": 142,
        "active_subscriptions": 4127,
        "total_revenue": 186240,
        "pending_approvals": 8,
        "top_categories": ["Development", "Marketing", "AI Agents", "Sales"],
    }
