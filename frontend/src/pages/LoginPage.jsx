import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

// ── Shared field component ────────────────────────────────────────────────────
function Field({ label, type, value, onChange, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const [show, setShow]       = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#8a9bb0", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 7 }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "12px 16px",
            paddingRight: isPassword ? 44 : 16,
            fontSize: 14,
            background: focused ? "#fff" : "#f7f9fc",
            border: `1.5px solid ${focused ? "#2563a8" : "#dde3ee"}`,
            borderRadius: 10,
            outline: "none",
            color: "#1a2540",
            transition: "all 0.2s",
            fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#8a9bb0", fontSize:16, lineHeight:1, padding:0 }}
          >
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider({ text }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
      <div style={{ flex:1, height:1, background:"#e8ecf4" }} />
      <span style={{ fontSize:11, color:"#aab4c8", fontWeight:600, letterSpacing:"0.06em" }}>{text}</span>
      <div style={{ flex:1, height:1, background:"#e8ecf4" }} />
    </div>
  );
}

// ── Demo badge ────────────────────────────────────────────────────────────────
function DemoAccounts({ onFill }) {
  const demos = [
    { label: "Sales Rep", email: "mike@tzmi.com" },
    { label: "Manager",   email: "sarah@tzmi.com" },
    { label: "Admin",     email: "admin@tzmi.com" },
  ];
  return (
    <div style={{ marginTop:20, padding:"14px 16px", background:"#f0f5ff", borderRadius:10, border:"1px dashed #b8cef0" }}>
      <p style={{ fontSize:11, fontWeight:700, color:"#4a6fa5", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:9 }}>Demo Accounts (any 6+ char password)</p>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {demos.map((d) => (
          <button key={d.email} type="button" onClick={() => onFill(d.email)}
            style={{ padding:"5px 12px", fontSize:11, fontWeight:600, background:"#fff", border:"1px solid #b8cef0", borderRadius:20, color:"#2563a8", cursor:"pointer" }}>
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Login Page ────────────────────────────────────────────────────────────────
export default function LoginPage({ onGoSignup }) {
  const { login, loading, error, setError } = useAuth();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    await login(email, password);
  };

  return (
    <div style={{ animation: "slideUp 0.35s ease forwards" }}>

      {/* Brand mark */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#2c5282,#1a7fd4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:14, fontWeight:900, color:"#e8a020", letterSpacing:1 }}>tz</span>
          </div>
          <span style={{ fontSize:22, fontWeight:800, color:"#1a2540", letterSpacing:"-0.5px" }}>tzmi</span>
        </div>
        <h1 style={{ fontSize:20, fontWeight:700, color:"#1a2540", margin:0, letterSpacing:"-0.3px" }}>Welcome back</h1>
        <p style={{ fontSize:13, color:"#8a9bb0", marginTop:4 }}>Sign in to your sales dashboard</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Field label="Email address" type="email"    value={email}    onChange={(e) => { setEmail(e.target.value);    setError(""); }} placeholder="you@company.com" autoComplete="email" />
        <Field label="Password"      type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Enter your password" autoComplete="current-password" />

        {/* Forgot password */}
        <div style={{ textAlign:"right", marginTop:-10, marginBottom:18 }}>
          <button type="button" style={{ background:"none", border:"none", fontSize:12, color:"#2563a8", cursor:"pointer", fontWeight:600, padding:0 }}>
            Forgot password?
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ marginBottom:16, padding:"10px 14px", background:"#fff0f0", border:"1px solid #fcc", borderRadius:8, fontSize:13, color:"#c0392b", display:"flex", alignItems:"center", gap:8 }}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* Submit */}
        <button type="submit" disabled={loading} style={{
          width:"100%", padding:"13px", fontSize:14, fontWeight:700,
          background: loading ? "#b0bdd4" : "linear-gradient(135deg,#2c5282,#1a7fd4)",
          color:"#fff", border:"none", borderRadius:10, cursor: loading ? "not-allowed" : "pointer",
          letterSpacing:"0.02em", transition:"all 0.2s",
          boxShadow: loading ? "none" : "0 4px 14px rgba(26,127,212,0.35)",
        }}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <Divider text="OR" />

      <DemoAccounts onFill={(email) => { setEmail(email); setPassword("demo123"); setError(""); }} />

      {/* Switch to signup */}
      <p style={{ textAlign:"center", fontSize:13, color:"#8a9bb0", marginTop:22 }}>
        Don't have an account?{" "}
        <button onClick={onGoSignup} style={{ background:"none", border:"none", color:"#2563a8", fontWeight:700, cursor:"pointer", fontSize:13, padding:0 }}>
          Create one
        </button>
      </p>
    </div>
  );
}
