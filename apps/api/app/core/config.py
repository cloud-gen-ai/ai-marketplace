from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_ENV: str = "development"
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Marketplace API"

    DATABASE_URL: str = "sqlite+aiosqlite:///./marketplace.db"
    REDIS_URL: str = "redis://localhost:6379/0"
    STRIPE_SECRET_KEY: str = "sk_test_placeholder"
    STRIPE_WEBHOOK_SECRET: str = "whsec_placeholder"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


settings = Settings()
