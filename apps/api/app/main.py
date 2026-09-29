from fastapi import FastAPI
from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title="AI Marketplace API",
    version="0.1.0",
    description="Scalable marketplace backend for selling reusable AI skill packs and plugin bundles.",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root() -> dict:
    return {
        "name": "AI Marketplace API",
        "status": "ok",
        "version": app.version,
    }
