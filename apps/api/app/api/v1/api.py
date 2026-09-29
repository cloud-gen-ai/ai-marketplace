from fastapi import APIRouter

from app.api.v1.routes.health import router as health_router
from app.api.v1.routes.products import router as products_router
from app.api.v1.routes.subscriptions import router as subscriptions_router
from app.api.v1.routes.webhooks import router as webhooks_router

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(products_router)
api_router.include_router(subscriptions_router)
api_router.include_router(webhooks_router)
