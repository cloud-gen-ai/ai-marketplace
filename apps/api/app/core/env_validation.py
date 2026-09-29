from app.core.config import settings


def validate_env() -> None:
    required = [
        "SECRET_KEY",
        "DATABASE_URL",
        "REDIS_URL",
    ]
    missing = [name for name in required if not getattr(settings, name, None)]
    if missing:
        raise RuntimeError(f"Missing required environment variables: {missing}")
