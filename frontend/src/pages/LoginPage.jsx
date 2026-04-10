import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ onGoSignup }) {
  const { login, error, setError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Enter username and password");
      return;
    }
    await login(username, password);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      
      {/* Header */}
      

      {/* Login Form */}
      <div style={{
        background: "#fff",
        padding: 35,
        borderRadius: 12,
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        width: 450,
        maxWidth: "90%",
        marginTop: 10
      }}>
        <h1 style={{ textAlign: "center", marginBottom: 40, fontSize: 28 }}>BizPortal</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 25 }}>
            <label style={{ fontSize: 18, fontWeight: "bold" }}>User Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 10px",
                fontSize: 18,
                marginTop: 8,
                borderRadius: 6,
                border: "1px solid #ccc"
              }}
            />
          </div>

          <div style={{ marginBottom: 25 }}>
            <label style={{ fontSize: 18, fontWeight: "bold" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 10px",
                fontSize: 18,
                marginTop: 8,
                borderRadius: 6,
                border: "1px solid #ccc"
              }}
            />
          </div>

          <button type="submit" style={{
            width: "100%",
            padding: "14px",
            fontSize: 16,
            background: "#2c5282",
            color: "#fff",
            border: "none",
            transform: "scale(1)",
            borderRadius: 6,
            cursor: "pointer"
          }}>
            Login
          </button>

          {error && <p style={{ color: "red", marginTop: 15, fontSize: 16 }}>{error}</p>}

          <p style={{ fontSize: 16, marginTop: 20, textAlign: "center" }}>
            <button onClick={onGoSignup} style={{ border: "none", background: "none", color: "blue", cursor: "pointer" }}>
              Don't have an account? Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}