from fastapi import APIRouter
from app.models.schemas import OrdersResponse
from app.data.mock_data import MOCK_ORDERS

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.get("", response_model=OrdersResponse)
def get_orders():
    """Return all open orders."""
    return {"orders": MOCK_ORDERS, "total": len(MOCK_ORDERS)}


@router.get("/{order_id}")
def get_order(order_id: str):
    """Return a single order by ID."""
    order = next((o for o in MOCK_ORDERS if o["id"] == order_id), None)
    if not order:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail=f"Order {order_id} not found")
    return order
