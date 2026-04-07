import React, { useState } from "react";
import LoginPage  from "./LoginPage";
import SignupPage from "./SignupPage";

function LeftPanel() {
  return (
    <div style={{
      flex: 1,
      background: "linear-gradient(160deg, #1a365d 0%, #2c5282 45%, #1a5fa5 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      gap: 40,
      padding: "48px 52px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative circles */}
      {[
        { size:320, top:-80,  left:-80,  opacity:0.06 },
        { size:200, top:200,  left:200,  opacity:0.05 },
        { size:150, bottom:60,right:-40, opacity:0.07 },
        { size:80,  bottom:180,left:60, opacity:0.1  },
      ].map((c, i) => (
        <div key={i} style={{
          position:"absolute", width:c.size, height:c.size, borderRadius:"50%",
          border:"1.5px solid rgba(255,255,255,0.4)",
          top:c.top, left:c.left, bottom:c.bottom, right:c.right,
          opacity:c.opacity,
        }} />
      ))}

      {/* Logo */}
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:"rgba(232,160,32,0.2)", border:"1px solid rgba(232,160,32,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:15, fontWeight:900, color:"#e8a020", letterSpacing:1 }}>tz</span>
          </div>
          <span style={{ fontSize:20, fontWeight:800, color:"#fff", letterSpacing:"-0.3px" }}>tzmi</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginLeft:2, letterSpacing:1 }}>AMG-1</span>
        </div>
      </div>

      {/* Hero text */}
      <div>
        <h2 style={{ fontSize:32, fontWeight:800, color:"#fff", lineHeight:1.2, margin:"0 0 16px", letterSpacing:"-0.5px" }}>
          Sales Inquiry<br />
          <span style={{ color:"#e8a020" }}>&amp; Analysis</span><br />
          Platform
        </h2>
        <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.7, margin:0, maxWidth:300 }}>
          Track top customers, items, and sales reps. Analyze performance by $, volume, and GP% — this month or YTD.
        </p>
      </div>

       
    </div>
  );
}

export default function AuthPage() {
  const [view, setView] = useState("login");   

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

      {/* Left decorative panel — hidden on small screens */}
      <div style={{ display:"flex", flex:"0 0 440px" }} className="auth-left">
        <LeftPanel />
      </div>

      {/* Right form panel */}
      <div style={{
        flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        background:"#f5f7fb", padding:"32px 24px", overflowY:"auto",
      }}>
        <div style={{
          width:"100%", maxWidth:420,
          background:"#fff", borderRadius:18,
          padding:"40px 40px 36px",
          boxShadow:"0 8px 40px rgba(26,54,93,0.1)",
          border:"1px solid #eaeef5",
        }}>
          {view === "login"
            ? <LoginPage  onGoSignup={() => setView("signup")} />
            : <SignupPage onGoLogin={()  => setView("login")}  />}
        </div>
      </div>

    </div>
  );
}
