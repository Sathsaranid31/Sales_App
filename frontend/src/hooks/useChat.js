import { useState, useCallback } from "react";
import axios from "axios";
import { TOP_ITEMS, TOP_CUSTOMERS, TOP_SP, MOCK_ORDERS } from "../data/mockData";

// ✅ Use your backend URL (important)
const API = "http://127.0.0.1:8000";

// ── Helpers ─────────────────────────────────────────────
const fmtS = (v) =>
  "$" + Number(v).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const fmtN = (v) => Number(v).toLocaleString("en-US");

// ── Local fallback AI ───────────────────────────────────
function generateLocalResponse(query) {
  const q = query.toLowerCase();
  const isYTD = q.includes("ytd");
  const period = isYTD ? "YTD" : "This Month";
  const isGP = q.includes("gp") || q.includes("gross");
  const isVol = q.includes("vol");

  const getMetric = () =>
    isGP ? "GP%" : isVol ? "Volume" : "Sales $";

  const getValue = (row) =>
    isGP ? `${row.gp}%` : isVol ? fmtN(row.vol) : fmtS(row.sales);

  if (q.includes("item") || q.includes("product")) {
    return {
      type: "table",
      title: `Top 5 Selling Items by ${getMetric()} — ${period}`,
      colLabels: ["Rank", "Item", "Division", getMetric()],
      rows: TOP_ITEMS.map((r) => [
        r.rank,
        r.name,
        r.division,
        getValue(r),
      ]),
      insight: `${TOP_ITEMS[0].name} leads.`,
    };
  }

  if (q.includes("customer") || q.includes("client")) {
    return {
      type: "table",
      title: `Top 5 Customers by ${getMetric()} — ${period}`,
      colLabels: ["Rank", "Customer", "Division", getMetric()],
      rows: TOP_CUSTOMERS.map((r) => [
        r.rank,
        r.name,
        r.division,
        getValue(r),
      ]),
      insight: `${TOP_CUSTOMERS[0].name} is your top customer.`,
    };
  }

  if (q.includes("sales") || q.includes("rep")) {
    return {
      type: "table",
      title: `Top 5 Sales Reps by ${getMetric()} — ${period}`,
      colLabels: ["Rank", "Salesperson", "Region", getMetric()],
      rows: TOP_SP.map((r) => [
        r.rank,
        r.name,
        r.region,
        getValue(r),
      ]),
    };
  }

  if (q.includes("order")) {
    return {
      type: "orders",
      title: "Open Sales Orders",
      orders: MOCK_ORDERS,
    };
  }

  return {
    type: "text",
    content: `I can help with sales, customers, items, or orders.`,
  };
}

// ── ID helper ───────────────────────────────────────────
let _id = 0;
const uid = () => ++_id;

// ── Hook ────────────────────────────────────────────────
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  const sendMessage = useCallback(async (text) => {
    const q = text.trim();
    if (!q || loading) return;

    if (!chatStarted) setChatStarted(true);

    const userMsg = { id: uid(), role: "user", content: q };
    const loadingMsg = { id: uid(), role: "assistant", loading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setLoading(true);

    let result;

    try {
      const res = await axios.post(`${API}/chat`, {
        messages: [{ role: "user", content: q }],
      });

      result = res.data?.data || generateLocalResponse(q);
    } catch (err) {
      console.log("Fallback mode:", err.message);
      result = generateLocalResponse(q);
    }

    setMessages((prev) =>
      prev.map((m) =>
        m.id === loadingMsg.id
          ? { ...m, loading: false, data: result }
          : m
      )
    );

    setLoading(false);
  }, [loading]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setChatStarted(false);
  }, []);

  return {
    messages,
    loading,
    chatStarted,
    sendMessage,
    resetChat,
  };
}