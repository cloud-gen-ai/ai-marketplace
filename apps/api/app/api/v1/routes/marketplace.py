from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user, require_roles
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductRead, ProductUpdate
from app.services.marketplace_cache import get_cached_marketplace_products, cache_marketplace_products

router = APIRouter(prefix="/marketplace", tags=["marketplace"])


@router.get("/products")
async def search_products(
    q: str | None = Query(default=None),
    category: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
) -> dict:
    cached = get_cached_marketplace_products(category=category, q=q, page=page, limit=limit)
    if cached is not None:
        return cached

    stmt = select(Product)
    if category:
        stmt = stmt.where(Product.category == category)
    if q:
        stmt = stmt.where((Product.title.ilike(f"%{q}%")) | (Product.description.ilike(f"%{q}%")))
    stmt = stmt.order_by(Product.created_at.desc()).offset((page - 1) * limit).limit(limit)

    result = await db.execute(stmt)
    items = result.scalars().all()

    payload = {
        "items": [
            ProductRead(
                id=item.id,
                slug=item.slug,
                title=item.title,
                category=item.category,
                short_description=item.short_description,
                description=item.description,
                price=item.price,
                is_free=item.is_free,
                status=item.status,
                seller_id=item.seller_id,
                created_at=item.created_at.isoformat(),
            )
            for item in items
        ],
        "page": page,
        "limit": limit,
        "total": len(items),
    }

    cache_marketplace_products(payload, category=category, q=q, page=page, limit=limit)
    return payload


@router.post("/products/{product_id}/approve")
async def approve_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
) -> dict:
    product = await db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    product.status = "approved"
    await db.commit()
    return {"status": "approved", "product_id": product.id, "title": product.title}


@router.post("/products/{product_id}/reject")
async def reject_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_roles("admin")),
) -> dict:
    product = await db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    product.status = "rejected"
    await db.commit()
    return {"status": "rejected", "product_id": product.id, "title": product.title}
