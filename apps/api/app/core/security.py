from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db


async def get_current_user(db: AsyncSession = Depends(get_db)) -> dict:
    """Placeholder auth dependency for future JWT/Supabase integration."""
    return {
        "id": "demo-user",
        "role": "buyer",
        "email": "demo@example.com",
    }
