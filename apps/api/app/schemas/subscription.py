from pydantic import BaseModel, Field


class SubscriptionBase(BaseModel):
    product_id: int
    plan_name: str = Field(default="starter", max_length=100)
    status: str = "active"


class SubscriptionCreate(SubscriptionBase):
    pass


class SubscriptionResponse(SubscriptionBase):
    id: int
    user_id: int
    stripe_subscription_id: str | None = None
    current_period_end: str | None = None
    created_at: str

    model_config = {"from_attributes": True}
