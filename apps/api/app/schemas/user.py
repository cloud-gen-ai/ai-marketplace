from pydantic import BaseModel, Field


class UserBase(BaseModel):
    email: str = Field(..., max_length=255)
    name: str | None = None
    avatar_url: str | None = None
    role: str = "buyer"


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: int
    created_at: str

    model_config = {"from_attributes": True}
