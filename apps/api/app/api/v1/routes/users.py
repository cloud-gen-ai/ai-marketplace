from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserRead

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=dict)
async def list_users(db: AsyncSession = Depends(get_db)) -> dict:
    result = await db.execute(select(User))
    items = result.scalars().all()
    return {
        "items": [
            UserRead(
                id=item.id,
                email=item.email,
                name=item.name,
                avatar_url=item.avatar_url,
                role=item.role,
                created_at=item.created_at.isoformat(),
            )
            for item in items
        ],
        "total": len(items),
    }


@router.get("/{user_id}", response_model=UserRead)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)) -> UserRead:
    item = await db.get(User, user_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserRead(
        id=item.id,
        email=item.email,
        name=item.name,
        avatar_url=item.avatar_url,
        role=item.role,
        created_at=item.created_at.isoformat(),
    )


@router.post("", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate, db: AsyncSession = Depends(get_db)) -> UserRead:
    existing = await db.execute(select(User).where(User.email == payload.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="User with this email already exists")

    item = User(
        email=payload.email,
        name=payload.name,
        avatar_url=payload.avatar_url,
        role=payload.role,
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)

    return UserRead(
        id=item.id,
        email=item.email,
        name=item.name,
        avatar_url=item.avatar_url,
        role=item.role,
        created_at=item.created_at.isoformat(),
    )
