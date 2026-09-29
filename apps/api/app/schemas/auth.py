from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    email: str = Field(..., max_length=255)
    password: str = Field(..., min_length=6, max_length=255)


class RegisterRequest(BaseModel):
    email: str = Field(..., max_length=255)
    password: str = Field(..., min_length=6, max_length=255)
    name: str | None = None
    avatar_url: str | None = None
    role: str = "buyer"


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict
