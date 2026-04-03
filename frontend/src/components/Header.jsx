import React from "react";

export default function Header() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #2c5282 0%, #1a365d 100%)",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      minHeight: 46,
      boxShadow: "0 2px 6px rgba(0,0,0,.2)",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#e8a020", letterSpacing: 1.5 }}>tzmi</span>
        <span style={{ color: "#a0b4cc", fontSize: 10 }}>AMG-1</span>
      </div>
      <div style={{ width: 1, height: 22, background: "#4a6fa5" }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: "#e2eaf5" }}>
        Sales Inquiry and Analysis with CheckBox
      </span>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 10, color: "#94a8bc" }}>
          Logged Today, Fri. Mar 29, 2024 03:00
        </span>
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: "#e8a020", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff",
        }}>O</div>
      </div>
    </div>
  );
}
