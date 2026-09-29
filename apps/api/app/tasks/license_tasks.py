import asyncio
from typing import Any

from app.services.marketplace_cache import cache_marketplace_products


async def issue_license_after_checkout(session_id: str, product_id: int, user_id: int) -> None:
    await asyncio.sleep(0)
    cache_marketplace_products({"status": "license_created", "session_id": session_id, "product_id": product_id, "user_id": user_id}, category=None, q=None, page=1, limit=20)
    return None
