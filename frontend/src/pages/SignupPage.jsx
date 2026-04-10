import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignupPage({ onGoLogin }) {
  const { signup, error, setError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Fill all fields");
      return;
    }

    await signup(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div style={{ marginBottom: 10, textAlign: "left" }}>
        <label>Name:</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10, textAlign: "left" }}>
        <label>Email:</label><br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10, textAlign: "left" }}>
        <label>Password:</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit">Create</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        <button onClick={onGoLogin} style={{ border: "none", background: "none", color: "blue" }}>
          Back to Login
        </button>
      </p>
    </form>
  );
}