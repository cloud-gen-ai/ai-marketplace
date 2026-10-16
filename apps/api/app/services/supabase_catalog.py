from typing import Any

import httpx

from app.core.config import settings


async def fetch_approved_products(
    *, q: str | None, category: str | None, page: int, limit: int
) -> dict[str, Any] | None:
    """Read the public catalog through Supabase's PostgREST API.

    The anon/publishable key can only see rows allowed by the products RLS policy.
    Returning None keeps the local database fallback available during migration or
    when Supabase is temporarily unavailable.
    """
    if not settings.SUPABASE_URL or not settings.SUPABASE_ANON_KEY:
        return None

    params: dict[str, str | int] = {
        "select": "id,slug,title,category,short_description,description,price,is_free,status,seller_id,created_at",
        "status": "eq.approved",
        "order": "created_at.desc",
    }
    if category:
        params["category"] = f"eq.{category}"

    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            response = await client.get(
                f"{settings.SUPABASE_URL.rstrip('/')}/rest/v1/products",
                params=params,
                headers={
                    "apikey": settings.SUPABASE_ANON_KEY,
                    "Authorization": f"Bearer {settings.SUPABASE_ANON_KEY}",
                },
            )
            response.raise_for_status()
            rows = response.json()

        if q:
            needle = q.casefold()
            rows = [
                row
                for row in rows
                if needle in (row.get("title") or "").casefold()
                or needle in (row.get("description") or "").casefold()
            ]

        start = (page - 1) * limit
        items = rows[start : start + limit]
        return {"items": items, "page": page, "limit": limit, "total": len(rows)}
    except (httpx.HTTPError, ValueError):
        return None
