from typing import List

from fastapi import APIRouter, HTTPException, status

router = APIRouter(prefix="/products", tags=["products"])

MOCK_PRODUCTS = [
    {
        "id": 1,
        "slug": "copilot-shipit-suite",
        "title": "Copilot ShipIt Suite",
        "category": "Development",
        "short_description": "Reusable GitHub Copilot workflows for engineering teams.",
        "description": "Pull request hygiene, release checklists, and engineering workflow prompts for product teams.",
        "price": 29.0,
        "is_free": False,
        "status": "live",
        "seller_id": 1,
        "created_at": "2026-09-29T00:00:00Z",
    },
    {
        "id": 2,
        "slug": "growth-launch-kit",
        "title": "Growth Launch Kit",
        "category": "Marketing",
        "short_description": "Campaign planning and launch messaging for growth teams.",
        "description": "Prompt packs for campaign strategy, retention loops, and launch sequencing.",
        "price": 19.0,
        "is_free": False,
        "status": "live",
        "seller_id": 2,
        "created_at": "2026-09-29T00:00:00Z",
    },
    {
        "id": 3,
        "slug": "agentops-blueprint",
        "title": "AgentOps Blueprint",
        "category": "AI Agents",
        "short_description": "Operational playbooks for AI agents and automations.",
        "description": "Frameworks for evaluating, governing, and improving autonomous AI workflows.",
        "price": 39.0,
        "is_free": False,
        "status": "live",
        "seller_id": 3,
        "created_at": "2026-09-29T00:00:00Z",
    },
]


@router.get("", response_model=dict)
async def list_products() -> dict:
    return {"items": MOCK_PRODUCTS, "total": len(MOCK_PRODUCTS)}


@router.get("/{product_id}")
async def get_product(product_id: int) -> dict:
    product = next((item for item in MOCK_PRODUCTS if item["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_product(payload: dict) -> dict:
    new_product = {
        "id": len(MOCK_PRODUCTS) + 1,
        "slug": payload.get("slug", "new-product"),
        "title": payload.get("title", "New Product"),
        "category": payload.get("category", "General"),
        "short_description": payload.get("short_description"),
        "description": payload.get("description"),
        "price": payload.get("price", 0.0),
        "is_free": payload.get("is_free", False),
        "status": payload.get("status", "draft"),
        "seller_id": payload.get("seller_id", 1),
        "created_at": "2026-09-29T00:00:00Z",
    }
    MOCK_PRODUCTS.append(new_product)
    return new_product
