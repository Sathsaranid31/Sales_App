import React, { useState, useRef, useEffect } from "react";
import { PRESET_PROMPTS, CAT_COLORS } from "../data/mockData";

const SUGGESTION_ROWS = [
  ["Top selling items this month", "Top customers by revenue", "Best GP% items YTD", "Take a quiz"],
  ["Top sales reps YTD",           "Show open orders",         "Organize thoughts",  "Write dialogue"],
];

export default function WelcomeScreen({ onSend }) {
  const [input, setInput] = useState("");
  const [mode,  setMode]  = useState("Smart");
  const textRef           = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  const submit = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    onSend(q);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <div style={{
      flex: 1,
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      gap: 28,
      overflowY: "auto",
    }}>

      {/* Greeting — matches the font weight/color of your chat UI */}
      <h1 style={{
        fontSize: "clamp(20px, 2.5vw, 28px)",
        fontWeight: 700,
        color: "#1a2540",
        letterSpacing: "-0.3px",
        margin: 0,
        textAlign: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>
        Hi there. What should we dive into today?
      </h1>

      {/* Input box — styled to match your chat input bar */}
      <div style={{
        width: "100%",
        maxWidth: 560,
        background: "#faf8f4",
        borderRadius: 12,
        border: "1px solid #c8c0b0",
        padding: "12px 14px 10px",
        boxShadow: "0 2px 12px rgba(26,54,93,0.07)",
      }}>
        {/* Textarea row */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
          <textarea
            ref={textRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message Copilot"
            rows={1}
            autoFocus
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: 13,
              color: "#1a2540",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              lineHeight: 1.6,
              minHeight: 26,
              maxHeight: 160,
              overflowY: "auto",
              caretColor: "#1a5fa5",
            }}
          />
          {/* Copilot dot icon */}
          <div style={{ display:"flex", alignItems:"center", paddingTop:4, flexShrink:0 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:"#1e8c6e" }} />
            <div style={{ width:10, height:10, borderRadius:"50%", background:"#1a5fa5", marginLeft:-3 }} />
          </div>
        </div>

        {/* Bottom toolbar — mirrors your chat input bar styling */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            {/* Plus button */}
            <button style={{
              width:26, height:26, borderRadius:"50%",
              background:"transparent", border:"1px solid #c8c0b0",
              color:"#8a9bb0", fontSize:16, lineHeight:1,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", fontFamily:"inherit",
            }}>+</button>

            {/* Mode pill */}
            <button
              onClick={() => setMode(m => m === "Smart" ? "Fast" : "Smart")}
              style={{
                display:"flex", alignItems:"center", gap:4,
                padding:"3px 10px", borderRadius:20,
                background:"transparent", border:"1px solid #c8c0b0",
                color:"#667", fontSize:11.5, cursor:"pointer",
                fontFamily:"inherit", fontWeight:500,
              }}
            >
              {mode} <span style={{ fontSize:8, opacity:.6 }}>▾</span>
            </button>
          </div>

          {/* Send button — identical to your chat Send button */}
          <button
            onClick={() => submit()}
            disabled={!input.trim()}
            style={{
              padding:"6px 18px",
              fontSize:12.5,
              fontWeight:700,
              background: input.trim() ? "#1a5fa5" : "#b0b8c4",
              color:"#fff",
              border:"none",
              borderRadius:20,
              cursor: input.trim() ? "pointer" : "not-allowed",
              transition:"background 0.2s",
              fontFamily:"inherit",
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* Quick prompt chips — same style as PresetPrompts bar in chat */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:9, width:"100%", maxWidth:600 }}>

        {/* Category label — matches your "QUICK PROMPTS" label */}
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
          <span style={{ fontSize:9.5, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:.7 }}>
            Quick Prompts
          </span>
        </div>

        {/* Chips — reuse same CAT_COLORS as PresetPrompts */}
        {SUGGESTION_ROWS.map((row, ri) => (
          <div key={ri} style={{ display:"flex", gap:7, flexWrap:"wrap", justifyContent:"center" }}>
            {row.map((chip) => {
              // Try to match chip to a preset prompt category for consistent coloring
              const match = PRESET_PROMPTS.find(p =>
                chip.toLowerCase().includes("item")     ? p.category === "Items"
                : chip.toLowerCase().includes("customer") || chip.toLowerCase().includes("revenue") ? p.category === "Customer"
                : chip.toLowerCase().includes("rep")    ? p.category === "Sales Rep"
                : chip.toLowerCase().includes("order")  ? p.category === "Orders"
                : false
              );
              const cat = match ? match.category : null;
              const c   = cat ? CAT_COLORS[cat] : { bg:"#f4f2ee", text:"#5a6070", border:"#d8d0c8" };

              return (
                <button
                  key={chip}
                  onClick={() => submit(chip)}
                  style={{
                    padding:"5px 14px",
                    fontSize:11.5,
                    background: c.bg,
                    border:`1px solid ${c.border}`,
                    borderRadius:20,
                    color: c.text,
                    cursor:"pointer",
                    fontFamily:"inherit",
                    fontWeight:500,
                    whiteSpace:"nowrap",
                    transition:"opacity 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity=".75"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity="1"}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
