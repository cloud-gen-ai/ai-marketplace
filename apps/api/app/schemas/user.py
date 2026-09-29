from typing import Any

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    email: str = Field(..., max_length=255)
    name: str | None = None
    avatar_url: str | None = None
    role: str = "buyer"


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=255)


class UserRead(UserBase):
    id: int
    created_at: str

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    name: str | None = None
    avatar_url: str | None = None
    role: str | None = None
