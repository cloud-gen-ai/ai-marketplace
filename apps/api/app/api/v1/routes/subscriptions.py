from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.subscription import Subscription
from app.models.user import User
from app.schemas.subscription import SubscriptionCreate, SubscriptionRead

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.get("", response_model=dict)
async def list_subscriptions(db: AsyncSession = Depends(get_db)) -> dict:
    result = await db.execute(select(Subscription))
    items = result.scalars().all()
    return {
        "items": [
            SubscriptionRead(
                id=item.id,
                user_id=item.user_id,
                product_id=item.product_id,
                plan_name=item.plan_name,
                status=item.status,
                stripe_subscription_id=item.stripe_subscription_id,
                current_period_end=item.current_period_end.isoformat() if item.current_period_end else None,
                created_at=item.created_at.isoformat(),
            )
            for item in items
        ],
        "total": len(items),
    }


@router.post("", response_model=SubscriptionRead, status_code=status.HTTP_201_CREATED)
async def create_subscription(
    payload: SubscriptionCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> SubscriptionRead:
    item = Subscription(
        user_id=current_user.id,
        product_id=payload.product_id,
        plan_name=payload.plan_name,
        status=payload.status,
        stripe_subscription_id=payload.stripe_subscription_id,
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)

    return SubscriptionRead(
        id=item.id,
        user_id=item.user_id,
        product_id=item.product_id,
        plan_name=item.plan_name,
        status=item.status,
        stripe_subscription_id=item.stripe_subscription_id,
        current_period_end=item.current_period_end.isoformat() if item.current_period_end else None,
        created_at=item.created_at.isoformat(),
    )
