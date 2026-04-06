// components/MessageBubble.jsx
import React from "react";

// Simple markdown renderer for bold and italic
const renderMarkdown = (text) => {
  if (!text) return null;
  let html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

// Component for structured responses (summary, tables, insights)
const StructuredResponse = ({ data }) => {
  const { summary, tables, insights } = data;

  return (
    <div style={{ lineHeight: 1.5 }}>
      {summary && renderMarkdown(summary)}

      {tables &&
        tables.map((table, idx) => (
          <div key={idx} style={{ margin: "16px 0", overflowX: "auto" }}>
            {table.title && <h4 style={{ margin: "8px 0" }}>{table.title}</h4>}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.85rem",
              }}
            >
              <thead>
                <tr>
                  {table.columns.map((col, i) => (
                    <th
                      key={i}
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        background: "#f5f5f5",
                        textAlign: "left",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {insights && insights.length > 0 && (
        <>
          <h4 style={{ margin: "16px 0 8px 0" }}>💡 Key Insights</h4>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {insights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// Welcome message
const WelcomeResponse = () => (
  <div>
    <p>👋 Hello! I'm your ENCH order assistant. Ask me about:</p>
    <ul>
      <li>Top orders / items / customers / sales reps</li>
      <li>Open orders or order history</li>
      <li>Customer or sales rep details</li>
    </ul>
  </div>
);

// Legacy support (if you still use old mock types)
const TableResponse = ({ data }) => <div>Table: {JSON.stringify(data)}</div>;
const OrdersResponse = ({ data }) => <div>Orders: {data.orders?.length} orders</div>;
const HelpResponse = () => (
  <div>Sorry, I didn't understand. Try "top items", "top customers", or "open orders".</div>
);

// Assistant bubble – handles loading and different response types
const AIBubble = ({ msg }) => {
  if (msg.loading) {
    return (
      <div style={{ display: "flex", gap: 5, alignItems: "center", height: 20 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1a7fd4",
              animation: `bounce 1.1s ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  if (!msg.data) return <span>{msg.content || "No content"}</span>;

  switch (msg.data.type) {
    case "structured":
      return <StructuredResponse data={msg.data} />;
    case "table":
      return <TableResponse data={msg.data} />;
    case "orders":
      return <OrdersResponse data={msg.data} />;
    case "help":
      return <HelpResponse />;
    case "welcome":
      return <WelcomeResponse />;
    default:
      return <span>{msg.content || "Unknown response"}</span>;
  }
};

const UserBubble = ({ msg }) => (
  <div
    style={{
      maxWidth: "72%",
      padding: "9px 14px",
      background: "#1a7fd4",
      borderRadius: "14px 14px 2px 14px",
      color: "#fff",
      fontSize: 13,
      fontWeight: 500,
      lineHeight: 1.5,
    }}
  >
    {msg.content}
  </div>
);

// Main export
export default function MessageBubble({ msg }) {
  if (!msg) return null;

  return msg.role === "user" ? (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
      <UserBubble msg={msg} />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        gap: 9,
        marginBottom: 14,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          minWidth: 28,
          borderRadius: "50%",
          background: "#e8f0fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 700,
          color: "#1a7fd4",
          border: "1px solid #c3d9f5",
          marginTop: 2,
        }}
      >
        AI
      </div>
      <div
        style={{
          maxWidth: "90%",
          padding: "10px 14px",
          background: "#fff",
          border: "0.5px solid #ddd",
          borderRadius: "2px 14px 14px 14px",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <AIBubble msg={msg} />
      </div>
    </div>
  );
}