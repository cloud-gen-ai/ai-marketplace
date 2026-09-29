from fastapi import APIRouter

router = APIRouter(tags=["system"])


@router.get("/healthz")
async def healthz() -> dict:
    return {"status": "ok", "service": "ai-marketplace-api"}
