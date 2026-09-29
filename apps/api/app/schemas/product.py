from typing import List, Literal

from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    slug: str = Field(..., min_length=2, max_length=255)
    title: str = Field(..., min_length=2, max_length=255)
    category: str = Field(..., min_length=2, max_length=120)
    short_description: str | None = None
    description: str | None = None
    price: float = 0.0
    is_free: bool = False
    status: Literal["draft", "pending", "approved", "live", "rejected"] = "draft"


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    title: str | None = None
    category: str | None = None
    short_description: str | None = None
    description: str | None = None
    price: float | None = None
    status: Literal["draft", "pending", "approved", "live", "rejected"] | None = None


class ProductResponse(ProductBase):
    id: int
    seller_id: int | None = None
    created_at: str

    model_config = {"from_attributes": True}


class ProductListResponse(BaseModel):
    items: List[ProductResponse]
    total: int
