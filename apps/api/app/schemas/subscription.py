from pydantic import BaseModel, Field


class SubscriptionBase(BaseModel):
    product_id: int
    plan_name: str = Field(default="starter", max_length=100)
    status: str = "active"
    stripe_subscription_id: str | None = None


class SubscriptionCreate(SubscriptionBase):
    pass


class SubscriptionRead(SubscriptionBase):
    id: int
    user_id: int
    current_period_end: str | None = None
    created_at: str

    model_config = {"from_attributes": True}
