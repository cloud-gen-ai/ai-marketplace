from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductListResponse, ProductRead, ProductUpdate

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=ProductListResponse)
async def list_products(
    category: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    skip: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> ProductListResponse:
    stmt = select(Product)
    if category:
        stmt = stmt.where(Product.category == category)
    stmt = stmt.offset(skip).limit(limit)

    result = await db.execute(stmt)
    items = result.scalars().all()

    total_stmt = select(Product)
    if category:
        total_stmt = total_stmt.where(Product.category == category)
    total_result = await db.execute(total_stmt)
    total = len(total_result.scalars().all())

    return {
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
        "total": total,
    }


@router.get("/{product_id}", response_model=ProductRead)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)) -> ProductRead:
    result = await db.get(Product, product_id)
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return ProductRead(
        id=result.id,
        slug=result.slug,
        title=result.title,
        category=result.category,
        short_description=result.short_description,
        description=result.description,
        price=result.price,
        is_free=result.is_free,
        status=result.status,
        seller_id=result.seller_id,
        created_at=result.created_at.isoformat(),
    )


@router.post("", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductCreate, db: AsyncSession = Depends(get_db)) -> ProductRead:
    existing = await db.execute(select(Product).where(Product.slug == payload.slug))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Product slug already exists")

    item = Product(
        slug=payload.slug,
        title=payload.title,
        category=payload.category,
        short_description=payload.short_description,
        description=payload.description,
        price=payload.price,
        is_free=payload.is_free,
        status=payload.status,
        seller_id=1,
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)

    return ProductRead(
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


@router.patch("/{product_id}", response_model=ProductRead)
async def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: AsyncSession = Depends(get_db),
) -> ProductRead:
    item = await db.get(Product, product_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)

    await db.commit()
    await db.refresh(item)

    return ProductRead(
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
