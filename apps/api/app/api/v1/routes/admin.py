from fastapi import APIRouter

router = APIRouter(tags=["admin"])


@router.get("/admin")
async def admin_dashboard() -> dict:
    return {"status": "ok", "modules": ["products", "subscriptions", "licenses"]}
