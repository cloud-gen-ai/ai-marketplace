from datetime import datetime, timedelta
import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.license import License
from app.models.product import Product
from app.schemas.license import LicenseCreate, LicenseRead

router = APIRouter(prefix="/licenses", tags=["licenses"])


@router.get("", response_model=dict)
async def list_licenses(db: AsyncSession = Depends(get_db)) -> dict:
    result = await db.execute(select(License))
    items = result.scalars().all()
    return {
        "items": [
            LicenseRead(
                id=item.id,
                user_id=item.user_id,
                product_id=item.product_id,
                license_key=item.license_key,
                status=item.status,
                expires_at=item.expires_at.isoformat() if item.expires_at else None,
                created_at=item.created_at.isoformat(),
            )
            for item in items
        ],
        "total": len(items),
    }


@router.post("", response_model=LicenseRead, status_code=status.HTTP_201_CREATED)
async def create_license(payload: LicenseCreate, db: AsyncSession = Depends(get_db)) -> LicenseRead:
    product = await db.get(Product, payload.product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    key = f"{product.slug.upper()}-{secrets.token_urlsafe(12)}"

    license_item = License(
        user_id=1,
        product_id=payload.product_id,
        license_key=key,
        status=payload.status,
        expires_at=datetime.utcnow() + timedelta(days=365),
    )
    db.add(license_item)
    await db.commit()
    await db.refresh(license_item)

    return LicenseRead(
        id=license_item.id,
        user_id=license_item.user_id,
        product_id=license_item.product_id,
        license_key=license_item.license_key,
        status=license_item.status,
        expires_at=license_item.expires_at.isoformat() if license_item.expires_at else None,
        created_at=license_item.created_at.isoformat(),
    )
