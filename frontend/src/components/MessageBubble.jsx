import React from "react";
import { TableResponse, OrdersResponse, HelpResponse, WelcomeResponse } from "./TableResponse";

function LoadingDots() {
  return (
    <div style={{ display:"flex", gap:5, alignItems:"center", height:20 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: "#1a7fd4",
          animation: `bounce 1.1s ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

function AIBubble({ msg }) {
  const renderContent = () => {
    if (msg.loading) return <LoadingDots />;
    if (!msg.data)   return <span>{msg.content}</span>;
    switch (msg.data.type) {
      case "table":   return <TableResponse   data={msg.data} />;
      case "orders":  return <OrdersResponse  data={msg.data} />;
      case "help":    return <HelpResponse />;
      case "welcome": return <WelcomeResponse />;
      default:        return <span>{msg.content}</span>;
    }
  };

  return (
    <div className="msg-enter" style={{ display:"flex", gap:9, marginBottom:14, alignItems:"flex-start" }}>
      <div style={{
        width:28, height:28, minWidth:28, borderRadius:"50%",
        background:"#e8f0fb", display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:10, fontWeight:700, color:"#1a7fd4", border:"1px solid #c3d9f5", marginTop:2,
      }}>AI</div>
      <div style={{
        maxWidth:"90%", padding:"10px 14px",
        background:"#fff", border:"0.5px solid #ddd",
        borderRadius:"2px 14px 14px 14px", fontSize:13, lineHeight:1.6,
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

function UserBubble({ msg }) {
  return (
    <div className="msg-enter" style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
      <div style={{
        maxWidth:"72%", padding:"9px 14px",
        background:"#1a7fd4", borderRadius:"14px 14px 2px 14px",
        color:"#fff", fontSize:13, fontWeight:500, lineHeight:1.5,
      }}>
        {msg.content}
      </div>
    </div>
  );
}

export default function MessageBubble({ msg }) {
  return msg.role === "user" ? <UserBubble msg={msg} /> : <AIBubble msg={msg} />;
}
