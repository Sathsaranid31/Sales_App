import React, { useState } from "react";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import OrdersGrid from "./components/OrdersGrid";

const TABS = [
  { id: "grid", label: "Sales Grid" },
  { id: "chat", label: "AI Analysis" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>

      {/* App header */}
      <Header />

      {/* Tab bar */}
      <div style={{ background:"#2a4a7f", display:"flex", gap:2, padding:"4px 14px 0", flexShrink:0 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding:"5px 16px", fontSize:11.5, fontWeight:600,
              cursor:"pointer", border:"none", borderRadius:"4px 4px 0 0",
              background: activeTab === tab.id ? "#fff" : "transparent",
              color:       activeTab === tab.id ? "#1a365d" : "#b0c4de",
              transition:"all .15s",
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Tab panels */}
      <div style={{ flex:1, display:"flex", overflow:"hidden", background:"#fff" }}>
        {activeTab === "grid" && <OrdersGrid onClose={() => setActiveTab("chat")} />}
        {activeTab === "chat" && <ChatWindow />}
      </div>
    </div>
  );
}
