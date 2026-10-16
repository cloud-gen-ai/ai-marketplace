from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.v1.api import api_router
from app.core.config import settings
from app.core.database import create_db_and_tables
from app.core.env_validation import validate_env

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Production-ready FastAPI backend for an AI marketplace with subscriptions, licenses, and Stripe integration.",
    docs_url="/docs",
    redoc_url="/redoc",
)

origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(',') if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ['*'],
    allow_credentials=bool(origins and origins != ['*']),
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event("startup")
async def startup_event() -> None:
    try:
        validate_env()
        logger.info("Environment validation passed")
    except RuntimeError as e:
        logger.error(f"Environment validation failed: {e}")
        raise

    try:
        await create_db_and_tables()
        logger.info("Database tables created/verified")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        raise


app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root() -> dict:
    return {"name": settings.PROJECT_NAME, "status": "ok", "version": "1.0.0"}
