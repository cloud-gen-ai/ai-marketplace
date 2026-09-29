from typing import Any

from app.core.cache import cache_get, cache_set


def get_marketplace_cache_key(category: str | None = None, q: str | None = None, page: int = 1, limit: int = 20) -> str:
    category_part = category or "all"
    q_part = q or "all"
    return f"marketplace:products:{category_part}:{q_part}:{page}:{limit}"


def cache_marketplace_products(payload: Any, category: str | None = None, q: str | None = None, page: int = 1, limit: int = 20, ttl_seconds: int = 300) -> None:
    key = get_marketplace_cache_key(category=category, q=q, page=page, limit=limit)
    cache_set(key, payload, ttl_seconds=ttl_seconds)


def get_cached_marketplace_products(category: str | None = None, q: str | None = None, page: int = 1, limit: int = 20) -> Any:
    key = get_marketplace_cache_key(category=category, q=q, page=page, limit=limit)
    return cache_get(key)
