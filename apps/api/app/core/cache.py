from upstash_redis import Redis

from app.core.config import settings

# Initialize Upstash Redis client
redis = Redis(
    url=settings.REDIS_URL,
    token=settings.REDIS_TOKEN,
)


def cache_get(key: str):
    """Get value from Redis cache"""
    try:
        value = redis.get(key)
        return value
    except Exception as e:
        print(f"Error getting from cache: {e}")
        return None


def cache_set(key: str, value: str, ttl_seconds: int = 300):
    """Set value in Redis cache with TTL"""
    try:
        redis.setex(key, ttl_seconds, value)
    except Exception as e:
        print(f"Error setting cache: {e}")


def cache_delete(*keys: str):
    """Delete keys from Redis cache"""
    try:
        if keys:
            redis.delete(*keys)
    except Exception as e:
        print(f"Error deleting cache: {e}")


def cache_exists(key: str) -> bool:
    """Check if key exists in Redis cache"""
    try:
        return redis.exists(key) > 0
    except Exception as e:
        print(f"Error checking cache: {e}")
        return False
