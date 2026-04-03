import React, { useState } from "react";
import { useOrders } from "../hooks/useOrders";

const COLS = ["#","Order ID","Customer","Division","Cust PO","Store","Start","Complete","Real Arrival","Order QTY","Ship QTY","Open QTY","Open $","Total $","BI"];
const RIGHT_COLS = new Set(["Order QTY","Ship QTY","Open QTY","Open $","Total $","BI"]);

export default function OrdersGrid({ onClose }) {
  const { orders, loading } = useOrders();
  const [selected, setSelected] = useState(new Set());

  const toggle = (id) =>
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", background:"#f8f4ee", borderBottom:"1px solid #e0d8cc", flexWrap:"wrap", flexShrink:0 }}>
        <div style={{ display:"flex", gap:4 }}>
          {["Enter","Search"].map((l) => (
            <button key={l} style={{ padding:"3px 10px", fontSize:10, background: l==="Search"?"#e8a020":"#5c8fd4", color:"#fff", border:"none", borderRadius:3, fontWeight:600 }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:3, marginLeft:6, flexWrap:"wrap" }}>
          {["Details","By Salesperson & Division","By Customer & Division","By Division"].map((l, i) => (
            <button key={l} style={{ padding:"3px 9px", fontSize:9.5, background: i===0?"#e8a020":"#d0ccc4", color: i===0?"#fff":"#333", border:"none", borderRadius:3 }}>{l}</button>
          ))}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:5, alignItems:"center" }}>
          <span style={{ fontSize:9.5, color:"#666" }}>Please Select to Print</span>
          <button style={{ padding:"3px 10px", fontSize:10, background:"#c0392b", color:"#fff", border:"none", borderRadius:3, fontWeight:600 }}>Print</button>
          <button onClick={onClose} style={{ padding:"3px 8px", fontSize:10, background:"#666", color:"#fff", border:"none", borderRadius:3 }}>Close</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflow:"auto", flex:1 }}>
        {loading ? (
          <div style={{ padding:24, textAlign:"center", color:"#888" }}>Loading orders…</div>
        ) : (
          <table style={{ width:"100%", fontSize:10.5 }}>
            <thead>
              <tr style={{ background:"#4a6fa5", color:"#fff", position:"sticky", top:0, zIndex:1 }}>
                <th style={{ width:24, padding:"5px 6px" }}></th>
                {COLS.map((c) => (
                  <th key={c} style={{ padding:"5px 6px", textAlign: RIGHT_COLS.has(c)?"right":"left", whiteSpace:"nowrap", fontWeight:600 }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => {
                const sel = selected.has(o.id);
                return (
                  <tr key={o.id} onClick={() => toggle(o.id)} style={{ cursor:"pointer", background: sel?"#fff3cd": i%2===0?"#fff":"#f6f3ef", borderBottom:"0.5px solid #ddd" }}>
                    <td style={{ padding:"4px 6px", textAlign:"center" }}>
                      <input type="checkbox" checked={sel} onChange={() => {}} style={{ accentColor:"#e8a020" }} />
                    </td>
                    <td style={{ padding:"4px 6px", color:"#888" }}>{i + 1}</td>
                    <td style={{ padding:"4px 6px", fontWeight:600, color:"#1a5fa5" }}>{o.id}</td>
                    <td style={{ padding:"4px 6px", maxWidth:150, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{o.customer}</td>
                    <td style={{ padding:"4px 6px", fontSize:10, color:"#555" }}>{o.division}</td>
                    <td style={{ padding:"4px 6px", fontSize:10 }}>{o.custPO}</td>
                    <td style={{ padding:"4px 6px" }}>{o.store}</td>
                    <td style={{ padding:"4px 6px", whiteSpace:"nowrap" }}>{o.start}</td>
                    <td style={{ padding:"4px 6px", whiteSpace:"nowrap" }}>{o.complete}</td>
                    <td style={{ padding:"4px 6px", whiteSpace:"nowrap" }}>{o.realArrival}</td>
                    <td style={{ padding:"4px 6px", textAlign:"right" }}>{o.orderQty.toLocaleString()}</td>
                    <td style={{ padding:"4px 6px", textAlign:"right" }}>{o.shippedQty}</td>
                    <td style={{ padding:"4px 6px", textAlign:"right", fontWeight:600 }}>{o.openQty.toLocaleString()}</td>
                    <td style={{ padding:"4px 6px", textAlign:"right", color:"#1a7a3a", fontWeight:500 }}>${o.openDate}</td>
                    <td style={{ padding:"4px 6px", textAlign:"right" }}>${o.totalDate}</td>
                    <td style={{ padding:"4px 6px", textAlign:"right" }}>{o.bi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
