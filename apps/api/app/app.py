from fastapi import FastAPI

from app.api.v1.api import api_router

app = FastAPI(
    title="AI Marketplace API",
    version="0.1.0",
    description="FastAPI backend for the AI marketplace",
)

app.include_router(api_router)
