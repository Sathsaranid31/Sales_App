import { useState, useCallback } from "react";
import axios from "axios";
import { TOP_ITEMS, TOP_CUSTOMERS, TOP_SP, MOCK_ORDERS } from "../data/mockData";

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmtS  = (v) => "$" + Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtN  = (v) => Number(v).toLocaleString("en-US");

// ── Local response generator (fallback / offline mode) ────────────────────────
function generateLocalResponse(query) {
  const q = query.toLowerCase();
  const isYTD   = q.includes("ytd");
  const period  = isYTD ? "YTD" : "This Month";
  const isGP    = q.includes("gp") || q.includes("gross");
  const isVol   = q.includes("vol");

  const getMetric = () => isGP ? "GP%" : isVol ? "Volume" : "Sales $";
  const getValue  = (row) => isGP ? `${row.gp}%` : isVol ? fmtN(row.vol) : fmtS(row.sales);

  if (q.includes("item") || q.includes("product") || (q.includes("selling") && !q.includes("customer") && !q.includes("sp"))) {
    return {
      type: "table",
      title: `Top 5 Selling Items by ${getMetric()} — ${period}`,
      metric: getMetric(),
      colLabels: ["Rank", "Item", "Division", getMetric()],
      rows: TOP_ITEMS.map((r) => [r.rank, r.name, r.division, getValue(r)]),
      insight: `${TOP_ITEMS[0].name} leads. Avg GP% across top 5: ${(TOP_ITEMS.reduce((s, r) => s + r.gp, 0) / 5).toFixed(1)}%.`,
    };
  }

  if (q.includes("customer") || q.includes("client") || q.includes("account")) {
    return {
      type: "table",
      title: `Top 5 Customers by ${getMetric()} — ${period}`,
      metric: getMetric(),
      colLabels: ["Rank", "Customer", "Division", getMetric()],
      rows: TOP_CUSTOMERS.map((r) => [r.rank, r.name, r.division, getValue(r)]),
      insight: `${TOP_CUSTOMERS[0].name} is your #1 customer with ${fmtS(TOP_CUSTOMERS[0].sales)}.`,
    };
  }

  if (q.includes(" sp") || q.includes("salesperson") || q.includes("sales rep") || q.includes("rep")) {
    return {
      type: "table",
      title: `Top 5 Sales Reps by ${getMetric()} — ${period}`,
      metric: getMetric(),
      colLabels: ["Rank", "Salesperson", "Region", getMetric()],
      rows: TOP_SP.map((r) => [r.rank, r.name, r.region, getValue(r)]),
      insight: `${TOP_SP[0].name} (${TOP_SP[0].region}) leads. Avg GP%: ${(TOP_SP.reduce((s, r) => s + r.gp, 0) / 5).toFixed(1)}%.`,
    };
  }

  if (q.includes("order") || q.includes("open") || q.includes("inquiry")) {
    return {
      type: "orders",
      title: "Open Sales Orders — Current",
      orders: MOCK_ORDERS,
      insight: `${MOCK_ORDERS.length} open orders · Total open qty: ${fmtN(MOCK_ORDERS.reduce((s, o) => s + o.openQty, 0))} units.`,
    };
  }

  return { type: "help" };
}

// ── Hook ─────────────────────────────────────────────────────────────────────
let _id = 0;
const uid = () => ++_id;

export function useChat() {
  const [messages, setMessages] = useState([
    { id: uid(), role: "assistant", data: { type: "welcome" } },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (text) => {
    const q = text.trim();
    if (!q || loading) return;

    const userMsg    = { id: uid(), role: "user", content: q };
    const loadingMsg = { id: uid(), role: "assistant", loading: true };
    setLoading(true);
    setMessages((prev) => [...prev, userMsg, loadingMsg]);

    let result;
    try {
      // Try real API first
      const res = await axios.post("/api/chat", {
        messages: [{ role: "user", content: q }],
      });
      result = res.data.data || generateLocalResponse(q);
    } catch {
      // Fallback to local mock
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      result = generateLocalResponse(q);
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === loadingMsg.id ? { ...m, loading: false, data: result } : m))
    );
    setLoading(false);
  }, [loading]);

  return { messages, loading, sendMessage };
}
