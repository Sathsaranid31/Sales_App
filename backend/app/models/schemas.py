from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict, Literal


# ── Request models ────────────────────────────────────────────────────────────

class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

    model_config = {"json_schema_extra": {"example": {"role": "user", "content": "Top selling items by $ this month"}}}


class ChatRequest(BaseModel):
    messages: List[Message] = Field(..., min_length=1)
    stream: Optional[bool] = False

    model_config = {
        "json_schema_extra": {
            "example": {
                "messages": [{"role": "user", "content": "Top customer by $ this month"}],
                "stream": False,
            }
        }
    }


# ── Response models ───────────────────────────────────────────────────────────

class ChatResponse(BaseModel):
    role: str = "assistant"
    content: str
    data: Optional[Dict[str, Any]] = None
    timestamp: Optional[str] = None


class OrderItem(BaseModel):
    id: str
    customer: str
    division: str
    custPO: str
    store: str
    start: str
    complete: str
    realArrival: str
    orderQty: int
    shippedQty: int
    openQty: int
    openDate: str
    totalDate: str
    bi: int


class OrdersResponse(BaseModel):
    orders: List[Dict[str, Any]]
    total: int


class PromptItem(BaseModel):
    id: int
    category: str
    label: str
    query: str


class PromptsResponse(BaseModel):
    prompts: List[PromptItem]
