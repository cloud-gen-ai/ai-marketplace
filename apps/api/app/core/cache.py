import json
from typing import Any

import redis

from app.core.config import settings

cache = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)


def cache_get(key: str) -> Any:
    value = cache.get(key)
    if value is None:
        return None
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return value


def cache_set(key: str, value: Any, ttl_seconds: int = 300) -> None:
    payload = json.dumps(value) if isinstance(value, (dict, list, tuple, int, float, bool)) else str(value)
    cache.setex(key, ttl_seconds, payload)


def cache_delete(*keys: str) -> None:
    if keys:
        cache.delete(*keys)
