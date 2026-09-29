from fastapi import APIRouter

from app.api.v1.routes.marketplace import router as marketplace_router

router = APIRouter()
router.include_router(marketplace_router)
