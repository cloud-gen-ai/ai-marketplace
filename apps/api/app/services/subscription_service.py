from datetime import datetime, timedelta
import secrets
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.license import License
from app.models.product import Product
from app.models.subscription import Subscription


async def create_license_from_subscription(
    db: AsyncSession,
    user_id: int,
    product_id: int,
    plan_name: str = "pro",
    validity_days: int = 365,
) -> License:
    """
    Create a license record after successful payment/subscription.
    This is the core monetization flow: payment → subscription → license access.
    """
    product = await db.get(Product, product_id)
    if not product:
        raise ValueError(f"Product {product_id} not found")

    key = f"{product.slug.upper()}-{secrets.token_urlsafe(16)}"
    expires_at = datetime.utcnow() + timedelta(days=validity_days)

    license_item = License(
        user_id=user_id,
        product_id=product_id,
        license_key=key,
        status="active",
        expires_at=expires_at,
    )
    db.add(license_item)
    await db.commit()
    await db.refresh(license_item)
    return license_item


async def activate_subscription_from_stripe(
    db: AsyncSession,
    user_id: int,
    product_id: int,
    stripe_subscription_id: str,
    plan_name: str = "pro",
) -> Subscription:
    """
    Create subscription record from Stripe webhook.
    Stripe charge success → subscription record + license grant.
    """
    subscription = Subscription(
        user_id=user_id,
        product_id=product_id,
        plan_name=plan_name,
        status="active",
        stripe_subscription_id=stripe_subscription_id,
        current_period_end=datetime.utcnow() + timedelta(days=30),
    )
    db.add(subscription)
    await db.commit()
    await db.refresh(subscription)

    await create_license_from_subscription(
        db=db,
        user_id=user_id,
        product_id=product_id,
        plan_name=plan_name,
        validity_days=365,
    )
    return subscription


async def cancel_user_subscription(
    db: AsyncSession,
    user_id: int,
    product_id: int,
) -> dict:
    """
    Cancel subscription and revoke license access.
    """
    result = await db.execute(
        select(Subscription).where(
            (Subscription.user_id == user_id) & (Subscription.product_id == product_id)
        )
    )
    subscription = result.scalar_one_or_none()
    if subscription:
        subscription.status = "cancelled"
        await db.commit()

    license_result = await db.execute(
        select(License).where(
            (License.user_id == user_id) & (License.product_id == product_id)
        )
    )
    license_item = license_result.scalar_one_or_none()
    if license_item:
        license_item.status = "revoked"
        await db.commit()

    return {"status": "cancelled", "user_id": user_id, "product_id": product_id}
