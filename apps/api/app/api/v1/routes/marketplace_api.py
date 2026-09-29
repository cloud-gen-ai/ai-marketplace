from fastapi import APIRouter

from app.api.v1.routes.marketplace import router as marketplace_router

api_router = APIRouter(prefix="/marketplace", tags=["marketplace"])
api_router.include_router(marketplace_router)
