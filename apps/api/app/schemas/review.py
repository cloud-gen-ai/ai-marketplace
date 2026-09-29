from pydantic import BaseModel, Field


class ReviewBase(BaseModel):
    product_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: str | None = None


class ReviewCreate(ReviewBase):
    pass


class ReviewRead(ReviewBase):
    id: int
    user_id: int
    created_at: str

    model_config = {"from_attributes": True}
