from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    slug: str = Field(..., min_length=2, max_length=255)
    title: str = Field(..., min_length=2, max_length=255)
    category: str = Field(..., min_length=2, max_length=120)
    short_description: str | None = None
    description: str | None = None
    price: float = 0.0
    is_free: bool = False
    status: str = "draft"


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    title: str | None = None
    category: str | None = None
    short_description: str | None = None
    description: str | None = None
    price: float | None = None
    is_free: bool | None = None
    status: str | None = None


class ProductRead(ProductBase):
    id: int
    seller_id: int | None = None
    created_at: str

    model_config = {"from_attributes": True}


class ProductListResponse(BaseModel):
    items: list[ProductRead]
    total: int
