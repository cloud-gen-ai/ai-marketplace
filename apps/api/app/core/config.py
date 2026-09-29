import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App settings
    APP_ENV: str = os.getenv("APP_ENV", "development")
    API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "AI Marketplace API")

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+asyncpg://postgres:postgres@localhost:5432/ai_marketplace",
    )

    # Redis - Upstash
    REDIS_URL: str = os.getenv(
        "REDIS_URL",
        "https://cheerful-ape-317433.upstash.io",
    )
    REDIS_TOKEN: str = os.getenv(
        "REDIS_TOKEN",
        "gQAAAAAABNf5AAIgcDFjOTg4ZmExMmUwMDg0MzYxOTI0YWRjZmJjYzJlNDJmNQ",
    )

    # Stripe
    STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "sk_test_placeholder")
    STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_placeholder")

    # Auth
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))


settings = Settings()
