import { useState, useEffect } from "react";
import axios from "axios";
import { MOCK_ORDERS } from "../data/mockData";

export function useOrders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        setOrders(res.data.orders);
      } catch {
        // Fallback to mock data if API unavailable
        setOrders(MOCK_ORDERS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return { orders, loading, error };
}
