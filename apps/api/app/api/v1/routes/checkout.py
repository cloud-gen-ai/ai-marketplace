from fastapi import APIRouter, Depends, Request

from app.core.security import get_current_user
from app.services.payment_service import create_checkout_session

router = APIRouter(prefix="/checkout", tags=["checkout"])


@router.post("/session")
async def create_checkout_session_route(
    product_id: int,
    plan_name: str = "pro",
    current_user=Depends(get_current_user),
) -> dict:
    session = await create_checkout_session(product_id=product_id, user_id=current_user.id, plan_name=plan_name)
    return session
