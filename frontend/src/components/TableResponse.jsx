import React from "react";

const fmtS = (v) => "$" + Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function TableResponse({ data }) {
  const { title, colLabels, rows, insight, metric } = data;
  const isGP = metric === "GP%";

  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 9 }}>{title}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #ddd" }}>
              {colLabels.map((h, i) => (
                <th key={h} style={{
                  padding: "4px 8px",
                  textAlign: i === 0 ? "center" : i === colLabels.length - 1 ? "right" : "left",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "0.5px solid #eee", background: i % 2 !== 0 ? "#f9f7f4" : "transparent" }}>
                <td style={{ padding: "6px 8px", textAlign: "center", fontWeight: 700, fontSize: 13, color: i === 0 ? "#c47c0a" : "#bbb" }}>{row[0]}</td>
                <td style={{ padding: "6px 8px", fontWeight: 500, fontSize: 11.5, maxWidth: 180 }}>{row[1]}</td>
                <td style={{ padding: "6px 8px", fontSize: 10.5, color: "#888" }}>{row[2]}</td>
                <td style={{ padding: "6px 8px", textAlign: "right", fontWeight: 600, fontSize: 12, color: isGP ? "#1a8045" : "#1a1a1a" }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10, padding: "8px 10px", background: "#e8f2fc", borderRadius: 6, fontSize: 11, color: "#1a4fa0", borderLeft: "3px solid #1a7fd4" }}>
        💡 {insight}
      </div>
    </div>
  );
}

export function OrdersResponse({ data }) {
  const { title, orders, insight } = data;
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 9 }}>{title}</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #ddd" }}>
              {["Order ID","Customer","Open QTY","Open $","BI"].map((h) => (
                <th key={h} style={{ padding:"4px 7px", fontSize:10, fontWeight:700, color:"#999", textTransform:"uppercase", letterSpacing:"0.04em", textAlign:["Open QTY","Open $","BI"].includes(h)?"right":"left", whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id} style={{ borderBottom:"0.5px solid #eee", background: i%2!==0?"#f9f7f4":"transparent" }}>
                <td style={{ padding:"5px 7px", fontWeight:600, color:"#1a7fd4", fontSize:12 }}>{o.id}</td>
                <td style={{ padding:"5px 7px", fontSize:11, maxWidth:170, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{o.customer}</td>
                <td style={{ padding:"5px 7px", textAlign:"right", fontWeight:500 }}>{o.openQty.toLocaleString()}</td>
                <td style={{ padding:"5px 7px", textAlign:"right", fontWeight:600, color:"#1a7a3a" }}>${o.openDate}</td>
                <td style={{ padding:"5px 7px", textAlign:"right", color:"#aaa" }}>{o.bi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop:10, padding:"8px 10px", background:"#e8f2fc", borderRadius:6, fontSize:11, color:"#1a4fa0", borderLeft:"3px solid #1a7fd4" }}>
        💡 {insight}
      </div>
    </div>
  );
}

export function HelpResponse() {
  return (
    <div style={{ fontSize: 12.5, lineHeight: 1.8 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Available queries:</div>
      {[
        "Top Selling Items by $, Volume, or GP% — this month / YTD",
        "Top Customers by $, Volume, or GP% — this month / YTD",
        "Top Sales Reps by $, Volume, or GP% — this month / YTD",
        "Open Orders — current inquiry list",
      ].map((t, i) => (
        <div key={i} style={{ display:"flex", gap:8, marginBottom:3 }}>
          <span style={{ color:"#1a7fd4", fontWeight:700 }}>→</span>
          <span style={{ color:"#444" }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

export function WelcomeResponse() {
  return (
    <div style={{ fontSize: 12.5, lineHeight: 1.8 }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: "#1a365d" }}>Welcome to Sales AI Analysis!</div>
      <div style={{ color:"#555", marginBottom:8 }}>Use the quick prompts above or type your query. I can help with:</div>
      {[
        "Top Selling Items by $, Volume, or GP%",
        "Top Customers by $, Volume, or GP%",
        "Top Sales Reps by $, Volume, or GP%",
        "Open Orders inquiry",
      ].map((t, i) => (
        <div key={i} style={{ display:"flex", gap:8, marginBottom:3 }}>
          <span style={{ color:"#e8a020", fontWeight:700 }}>→</span>
          <span style={{ color:"#444" }}>{t}</span>
        </div>
      ))}
    </div>
  );
}
