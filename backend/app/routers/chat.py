from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from datetime import datetime
from app.models.schemas import ChatRequest, ChatResponse
from app.data.mock_data import TOP_ITEMS, TOP_CUSTOMERS, TOP_SP, MOCK_ORDERS
import json
import asyncio

router = APIRouter(prefix="/api/chat", tags=["chat"])


# ── Helpers ───────────────────────────────────────────────────────────────────

def fmt_currency(v: float) -> str:
    return f"${v:,.2f}"

def fmt_number(v: int) -> str:
    return f"{v:,}"


# ── Response builder ──────────────────────────────────────────────────────────

def build_response(query: str) -> dict:
    q = query.lower()
    is_ytd  = "ytd"     in q
    is_gp   = "gp"      in q or "gross" in q
    is_vol  = "vol"     in q
    period  = "YTD" if is_ytd else "This Month"

    def get_metric():
        if is_gp:  return "GP%"
        if is_vol: return "Volume"
        return "Sales $"

    def get_value(row):
        if is_gp:  return f"{row['gp']}%"
        if is_vol: return fmt_number(row["vol"])
        return fmt_currency(row["sales"])

    # ── Items ──
    if "item" in q or "product" in q or (
        "selling" in q and "customer" not in q and " sp" not in q and "rep" not in q
    ):
        metric = get_metric()
        avg_gp = round(sum(r["gp"] for r in TOP_ITEMS) / len(TOP_ITEMS), 1)
        return {
            "type": "table",
            "title": f"Top 5 Selling Items by {metric} — {period}",
            "metric": metric,
            "colLabels": ["Rank", "Item", "Division", metric],
            "rows": [[r["rank"], r["name"], r["division"], get_value(r)] for r in TOP_ITEMS],
            "insight": f"{TOP_ITEMS[0]['name']} leads. Avg GP% across top 5: {avg_gp}%.",
        }

    # ── Customers ──
    if "customer" in q or "client" in q or "account" in q:
        metric = get_metric()
        return {
            "type": "table",
            "title": f"Top 5 Customers by {metric} — {period}",
            "metric": metric,
            "colLabels": ["Rank", "Customer", "Division", metric],
            "rows": [[r["rank"], r["name"], r["division"], get_value(r)] for r in TOP_CUSTOMERS],
            "insight": f"{TOP_CUSTOMERS[0]['name']} is your #1 customer with {fmt_currency(TOP_CUSTOMERS[0]['sales'])}.",
        }

    # ── Sales Reps ──
    if " sp" in q or "salesperson" in q or "sales rep" in q or "rep" in q:
        metric = get_metric()
        avg_gp = round(sum(r["gp"] for r in TOP_SP) / len(TOP_SP), 1)
        return {
            "type": "table",
            "title": f"Top 5 Sales Reps by {metric} — {period}",
            "metric": metric,
            "colLabels": ["Rank", "Salesperson", "Region", metric],
            "rows": [[r["rank"], r["name"], r["region"], get_value(r)] for r in TOP_SP],
            "insight": f"{TOP_SP[0]['name']} ({TOP_SP[0]['region']}) leads. Avg GP%: {avg_gp}%.",
        }

    # ── Orders ──
    if "order" in q or "open" in q or "inquiry" in q:
        total_qty = sum(o["openQty"] for o in MOCK_ORDERS)
        return {
            "type": "orders",
            "title": "Open Sales Orders — Current",
            "orders": MOCK_ORDERS,
            "insight": f"{len(MOCK_ORDERS)} open orders · Total open qty: {fmt_number(total_qty)} units.",
        }

    # ── Fallback ──
    return {"type": "help"}


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Process a chat message and return a structured response."""
    last_user = next(
        (m.content for m in reversed(request.messages) if m.role == "user"), ""
    )

    result = build_response(last_user)

    if request.stream:
        summary = result.get("title", result.get("type", "response"))

        async def event_stream():
            words = summary.split()
            for i, word in enumerate(words):
                chunk = word + (" " if i < len(words) - 1 else "")
                yield f"data: {json.dumps({'delta': chunk})}\n\n"
                await asyncio.sleep(0.04)
            yield f"data: {json.dumps({'done': True, 'data': result})}\n\n"

        return StreamingResponse(event_stream(), media_type="text/event-stream")

    return ChatResponse(
        role="assistant",
        content=result.get("title", ""),
        data=result,
        timestamp=datetime.utcnow().isoformat(),
    )
