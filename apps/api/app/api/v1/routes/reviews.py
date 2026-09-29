from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.product import Product
from app.models.review import Review
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewRead

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("/product/{product_id}")
async def get_product_reviews(product_id: int, db: AsyncSession = Depends(get_db)) -> dict:
    """
    Get all reviews for a product with average rating.
    """
    result = await db.execute(select(Review).where(Review.product_id == product_id))
    reviews = result.scalars().all()

    avg_rating_result = await db.execute(
        select(func.avg(Review.rating)).where(Review.product_id == product_id)
    )
    avg_rating = avg_rating_result.scalar() or 0

    return {
        "items": [
            ReviewRead(
                id=item.id,
                product_id=item.product_id,
                user_id=item.user_id,
                rating=item.rating,
                comment=item.comment,
                created_at=item.created_at.isoformat(),
            )
            for item in reviews
        ],
        "total": len(reviews),
        "average_rating": float(avg_rating),
    }


@router.post("", response_model=ReviewRead, status_code=status.HTTP_201_CREATED)
async def create_review(
    payload: ReviewCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ReviewRead:
    """
    Create a product review.
    Only authenticated users can leave reviews.
    """
    product = await db.get(Product, payload.product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    existing = await db.execute(
        select(Review).where(
            (Review.product_id == payload.product_id) & (Review.user_id == current_user.id)
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="You have already reviewed this product")

    review = Review(
        product_id=payload.product_id,
        user_id=current_user.id,
        rating=payload.rating,
        comment=payload.comment,
    )
    db.add(review)
    await db.commit()
    await db.refresh(review)

    return ReviewRead(
        id=review.id,
        product_id=review.product_id,
        user_id=review.user_id,
        rating=review.rating,
        comment=review.comment,
        created_at=review.created_at.isoformat(),
    )
