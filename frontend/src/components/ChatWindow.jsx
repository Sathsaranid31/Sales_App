import React, { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import PresetPrompts from "./PresetPrompts";
import { useChat } from "../hooks/useChat";

export default function ChatWindow() {
  const { messages, loading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Preset prompt bar */}
      <PresetPrompts onSelect={(q) => { sendMessage(q); }} />

      {/* Message list */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px 8px" }}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding:"10px 14px",
        borderTop:"1px solid #e8e2d8",
        background:"#faf8f4",
        display:"flex", gap:8, alignItems:"flex-end",
        flexShrink:0,
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about sales, customers, top items, open orders…"
          rows={1}
          style={{
            flex:1, resize:"none", padding:"9px 12px", fontSize:13,
            border:"1px solid #c8c0b0", borderRadius:8, outline:"none",
            background:"#fff", fontFamily:"inherit", lineHeight:1.5,
            minHeight:38, maxHeight:100, overflowY:"auto",
            transition:"border-color .15s",
          }}
          onFocus={(e)  => e.target.style.borderColor = "#1a5fa5"}
          onBlur={(e)   => e.target.style.borderColor = "#c8c0b0"}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          style={{
            padding:"9px 20px", fontSize:13, fontWeight:700,
            background: !input.trim() || loading ? "#b0b8c4" : "#1a5fa5",
            color:"#fff", border:"none", borderRadius:8,
            cursor: !input.trim() || loading ? "not-allowed" : "pointer",
            minHeight:38, whiteSpace:"nowrap", transition:"background .2s",
          }}
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
