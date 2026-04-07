import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Field({ label, type, value, onChange, placeholder, autoComplete, hint }) {
  const [focused, setFocused] = useState(false);
  const [show, setShow]       = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#8a9bb0", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:7 }}>
        {label}
      </label>
      <div style={{ position:"relative" }}>
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width:"100%", padding:"12px 16px", paddingRight: isPassword ? 44 : 16,
            fontSize:14, background: focused ? "#fff" : "#f7f9fc",
            border:`1.5px solid ${focused ? "#2563a8" : "#dde3ee"}`,
            borderRadius:10, outline:"none", color:"#1a2540",
            transition:"all 0.2s", fontFamily:"inherit", boxSizing:"border-box",
          }}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((s) => !s)}
            style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#8a9bb0", fontSize:16, lineHeight:1, padding:0 }}>
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {hint && <p style={{ fontSize:11, color:"#aab4c8", marginTop:5 }}>{hint}</p>}
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    { label: "6+ characters", pass: password.length >= 6 },
    { label: "Uppercase",     pass: /[A-Z]/.test(password) },
    { label: "Number",        pass: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["#e8ecf4", "#e74c3c", "#e8a020", "#27ae60"];
  const labels = ["", "Weak", "Fair", "Strong"];

  return (
    <div style={{ marginBottom:16, marginTop:-8 }}>
      <div style={{ display:"flex", gap:4, marginBottom:6 }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{ flex:1, height:3, borderRadius:3, background: i < score ? colors[score] : "#e8ecf4", transition:"background 0.3s" }} />
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap:10 }}>
          {checks.map((c) => (
            <span key={c.label} style={{ fontSize:10.5, color: c.pass ? "#27ae60" : "#bbb", display:"flex", alignItems:"center", gap:3 }}>
              <span>{c.pass ? "✓" : "○"}</span> {c.label}
            </span>
          ))}
        </div>
        {password && <span style={{ fontSize:11, fontWeight:700, color: colors[score] }}>{labels[score]}</span>}
      </div>
    </div>
  );
}

export default function SignupPage({ onGoLogin }) {
  const { signup, loading, error, setError } = useAuth();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [agreed,   setAgreed]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!agreed) { setError("Please accept the terms to continue."); return; }
    await signup(name, email, password);
  };

  return (
    <div style={{ animation:"slideUp 0.35s ease forwards" }}>

      {/* Brand */}
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#2c5282,#1a7fd4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:14, fontWeight:900, color:"#e8a020", letterSpacing:1 }}>tz</span>
          </div>
          <span style={{ fontSize:22, fontWeight:800, color:"#1a2540", letterSpacing:"-0.5px" }}>tzmi</span>
        </div>
        <h1 style={{ fontSize:20, fontWeight:700, color:"#1a2540", margin:0, letterSpacing:"-0.3px" }}>Create your account</h1>
        <p style={{ fontSize:13, color:"#8a9bb0", marginTop:4 }}>Start analyzing your sales data</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Field label="Full name"      type="text"     value={name}     onChange={(e) => { setName(e.target.value);     setError(""); }} placeholder="John Smith"          autoComplete="name" />
        <Field label="Work email"     type="email"    value={email}    onChange={(e) => { setEmail(e.target.value);    setError(""); }} placeholder="you@company.com"      autoComplete="email" />
        <Field label="Password"       type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Create a password"    autoComplete="new-password" />
        {password && <PasswordStrength password={password} />}
        <Field label="Confirm password" type="password" value={confirm} onChange={(e) => { setConfirm(e.target.value); setError(""); }} placeholder="Repeat your password" autoComplete="new-password" />

        {/* Terms */}
        <label style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:18, cursor:"pointer" }}>
          <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setError(""); }}
            style={{ marginTop:2, accentColor:"#2563a8", width:15, height:15, flexShrink:0 }} />
          <span style={{ fontSize:12, color:"#6a7a90", lineHeight:1.5 }}>
            I agree to the{" "}
            <span style={{ color:"#2563a8", fontWeight:600 }}>Terms of Service</span>
            {" "}and{" "}
            <span style={{ color:"#2563a8", fontWeight:600 }}>Privacy Policy</span>
          </span>
        </label>

        {/* Error */}
        {error && (
          <div style={{ marginBottom:16, padding:"10px 14px", background:"#fff0f0", border:"1px solid #fcc", borderRadius:8, fontSize:13, color:"#c0392b", display:"flex", alignItems:"center", gap:8 }}>
            <span>⚠</span> {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          width:"100%", padding:"13px", fontSize:14, fontWeight:700,
          background: loading ? "#b0bdd4" : "linear-gradient(135deg,#1a7a3a,#27ae60)",
          color:"#fff", border:"none", borderRadius:10,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing:"0.02em", transition:"all 0.2s",
          boxShadow: loading ? "none" : "0 4px 14px rgba(39,174,96,0.35)",
        }}>
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p style={{ textAlign:"center", fontSize:13, color:"#8a9bb0", marginTop:22 }}>
        Already have an account?{" "}
        <button onClick={onGoLogin} style={{ background:"none", border:"none", color:"#2563a8", fontWeight:700, cursor:"pointer", fontSize:13, padding:0 }}>
          Sign in
        </button>
      </p>
    </div>
  );
}
