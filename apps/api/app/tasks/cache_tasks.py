from app.services.marketplace_cache import cache_marketplace_products


def trigger_marketplace_cache_invalidation() -> None:
    cache_marketplace_products({"status": "cache_invalidated"}, category=None, q=None, page=1, limit=20)
