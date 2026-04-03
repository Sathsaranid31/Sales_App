from fastapi import APIRouter
from app.models.schemas import PromptsResponse
from app.data.mock_data import PRESET_PROMPTS

router = APIRouter(prefix="/api/prompts", tags=["prompts"])


@router.get("", response_model=PromptsResponse)
def get_prompts():
    """Return all preset prompt definitions."""
    return {"prompts": PRESET_PROMPTS}


@router.get("/{category}")
def get_prompts_by_category(category: str):
    """Return prompts filtered by category."""
    filtered = [p for p in PRESET_PROMPTS if p["category"].lower() == category.lower()]
    return {"prompts": filtered, "total": len(filtered)}
