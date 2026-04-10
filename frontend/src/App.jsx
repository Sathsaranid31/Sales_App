import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import OrdersGrid from "./components/OrdersGrid";

const TABS = [
  { id: "grid", label: "Sales Grid" },
  { id: "chat", label: "AI Analysis" },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("grid");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif"   // ✅ ERP style font
    }}>

      {/* Header */}
      <Header />

      {/* Tabs */}
      <div style={{
        background: "#2c5282",
        display: "flex",
        gap: 2,
        padding: "4px 10px 0",
        borderBottom: "1px solid #ccc"
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "6px 14px",
              fontSize: 12,
              cursor: "pointer",
              border: "1px solid #ccc",
              borderBottom: activeTab === tab.id ? "none" : "1px solid #ccc",
              background: activeTab === tab.id ? "#fff" : "#e6e6e6",
              color: "#000",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: "auto",
        background: "#fff",
        borderTop: "none"
      }}>
        {activeTab === "grid" && <OrdersGrid />}
        {activeTab === "chat" && <ChatWindow />}
      </div>
    </div>
  );
}

function AppRouter() {
  const { user, loading } = useAuth();

  // ✅ Simple ERP-style loading
  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}