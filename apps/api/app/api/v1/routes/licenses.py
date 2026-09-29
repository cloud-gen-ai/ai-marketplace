from fastapi import APIRouter

router = APIRouter(tags=["licenses"])


@router.get("/licenses")
async def list_licenses() -> dict:
    return {"items": [], "total": 0}
