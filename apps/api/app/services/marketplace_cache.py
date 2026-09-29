import json
from typing import Any

from app.core.cache import cache_get, cache_set, cache_delete, cache_exists


def get_marketplace_cache_key(
    category: str | None = None, q: str | None = None, page: int = 1, limit: int = 20
) -> str:
    """Generate cache key for marketplace products"""
    category_part = category or "all"
    q_part = (q or "all").replace(" ", "_").lower()
    return f"marketplace:products:{category_part}:{q_part}:{page}:{limit}"


def cache_marketplace_products(
    payload: Any,
    category: str | None = None,
    q: str | None = None,
    page: int = 1,
    limit: int = 20,
    ttl_seconds: int = 300,
) -> None:
    """Cache marketplace products"""
    key = get_marketplace_cache_key(category=category, q=q, page=page, limit=limit)
    value = json.dumps(payload) if isinstance(payload, dict) else str(payload)
    cache_set(key, value, ttl_seconds=ttl_seconds)


def get_cached_marketplace_products(
    category: str | None = None, q: str | None = None, page: int = 1, limit: int = 20
) -> dict | None:
    """Get cached marketplace products"""
    key = get_marketplace_cache_key(category=category, q=q, page=page, limit=limit)
    cached = cache_get(key)
    if cached:
        try:
            return json.loads(cached)
        except json.JSONDecodeError:
            return None
    return None


def invalidate_marketplace_cache() -> None:
    """Invalidate all marketplace cache keys"""
    # In production, you'd scan and delete all marketplace:products:* keys
    # For now, we'll keep it simple
    pass
