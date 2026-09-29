from pydantic import BaseModel, Field


class LicenseBase(BaseModel):
    product_id: int
    license_key: str = Field(..., min_length=10, max_length=255)
    status: str = "active"


class LicenseCreate(LicenseBase):
    pass


class LicenseResponse(LicenseBase):
    id: int
    user_id: int
    expires_at: str | None = None
    created_at: str

    model_config = {"from_attributes": True}
