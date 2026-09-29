from fastapi import FastAPI

from app.api.v1.api import api_router
from app.core.config import settings
from app.core.database import create_db_and_tables

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    description="High-performance FastAPI backend for an AI marketplace with subscriptions, licenses, and digital product commerce.",
    docs_url="/docs",
    redoc_url="/redoc",
)


@app.on_event("startup")
async def startup_event() -> None:
    await create_db_and_tables()


app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root() -> dict:
    return {"name": settings.PROJECT_NAME, "status": "ok", "version": "0.1.0"}
