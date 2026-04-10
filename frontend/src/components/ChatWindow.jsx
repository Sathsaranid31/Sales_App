import React, { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import PresetPrompts from "./PresetPrompts";
import WelcomeScreen from "./WelcomeScreen";
import { useChat } from "../hooks/useChat";

export default function ChatWindow() {
  const { messages, loading, chatStarted, sendMessage, resetChat } = useChat();

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // ✅ Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Auto focus input after chat starts
  useEffect(() => {
    if (chatStarted) {
      inputRef.current?.focus();
    }
  }, [chatStarted]);

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

  // ───────────── WELCOME SCREEN ─────────────
  if (!chatStarted) {
    return (
      <WelcomeScreen
        onSend={(q) => {
          sendMessage(q); // ✅ triggers chatStarted inside hook
        }}
      />
    );
  }

  // ───────────── CHAT UI ─────────────
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>

      {/* Preset prompts */}
      <PresetPrompts onSelect={(q) => sendMessage(q)} />

      {/* Top bar with reset */}
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "6px 14px",
        borderBottom: "1px solid #e0e0e0",
        background: "#f5f5f5"
      }}>
        <button
          onClick={() => {
            resetChat();
            setInput(""); // ✅ clear input
          }}
          style={{
            padding: "4px 12px",
            fontSize: 12,
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer"
          }}
        >
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "12px"
      }}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "10px",
        borderTop: "1px solid #ccc",
        display: "flex",
        gap: 8
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
          rows={1}
          style={{
            flex: 1,
            padding: 8,
            border: "1px solid #ccc",
            resize: "none"
          }}
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          style={{
            padding: "8px 16px",
            background: !input.trim() || loading ? "#aaa" : "#2c5282",
            color: "#fff",
            border: "none",
            cursor: !input.trim() || loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}