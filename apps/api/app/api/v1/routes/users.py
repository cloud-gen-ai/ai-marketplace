from fastapi import APIRouter

router = APIRouter(tags=["users"])


@router.get("/users")
async def list_users() -> dict:
    return {"items": [], "total": 0}
