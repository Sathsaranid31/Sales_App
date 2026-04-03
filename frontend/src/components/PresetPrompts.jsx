import React, { useState } from "react";
import { PRESET_PROMPTS, CAT_COLORS } from "../data/mockData";

const CATEGORIES = ["All", ...Array.from(new Set(PRESET_PROMPTS.map((p) => p.category)))];

export default function PresetPrompts({ onSelect }) {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All"
    ? PRESET_PROMPTS
    : PRESET_PROMPTS.filter((p) => p.category === activeCat);

  return (
    <div style={{ borderBottom:"1px solid #e8e2d8", background:"#faf8f4", padding:"8px 14px", flexShrink:0 }}>

      {/* Category filter pills */}
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7, flexWrap:"wrap" }}>
        <span style={{ fontSize:9.5, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:.7 }}>Quick Prompts</span>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setActiveCat(c)} style={{
            padding:"2px 10px", fontSize:10, borderRadius:20, fontWeight:600, border:"1px solid",
            cursor:"pointer", transition:"all .15s",
            background: activeCat === c ? "#1a5fa5" : "transparent",
            color:       activeCat === c ? "#fff"    : "#888",
            borderColor: activeCat === c ? "#1a5fa5" : "#ccc",
          }}>{c}</button>
        ))}
      </div>

      {/* Prompt chips */}
      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {filtered.map((p) => {
          const c = CAT_COLORS[p.category];
          return (
            <button key={p.id} onClick={() => onSelect(p.query)} style={{
              padding:"4px 12px", fontSize:11, fontWeight:500,
              borderRadius:20, border:`1px solid ${c.border}`,
              background: c.bg, color: c.text,
              cursor:"pointer", whiteSpace:"nowrap",
              transition:"opacity .15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = ".75"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >{p.label}</button>
          );
        })}
      </div>
    </div>
  );
}
