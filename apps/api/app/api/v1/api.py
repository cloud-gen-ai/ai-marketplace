from fastapi import APIRouter

from app.api.v1.routes.admin import router as admin_router
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.checkout import router as checkout_router
from app.api.v1.routes.health import router as health_router
from app.api.v1.routes.licenses import router as licenses_router
from app.api.v1.routes.products import router as products_router
from app.api.v1.routes.subscriptions import router as subscriptions_router
from app.api.v1.routes.users import router as users_router
from app.api.v1.routes.webhooks import router as webhooks_router

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(products_router)
api_router.include_router(subscriptions_router)
api_router.include_router(licenses_router)
api_router.include_router(checkout_router)
api_router.include_router(webhooks_router)
api_router.include_router(admin_router)
