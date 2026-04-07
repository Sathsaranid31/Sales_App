import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Mock user store — replace with real API calls when backend is ready
const MOCK_USERS = [
  { id: 1, name: "Mike Campbell", email: "mike@tzmi.com",  role: "Sales Rep",  avatar: "MC" },
  { id: 2, name: "Sarah Johnson", email: "sarah@tzmi.com", role: "Manager",    avatar: "SJ" },
  { id: 3, name: "Admin User",    email: "admin@tzmi.com", role: "Admin",      avatar: "AU" },
];

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 900)); // simulate network
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found && password.length >= 6) {
      setUser(found);
      setLoading(false);
      return true;
    }
    setError("Invalid email or password.");
    setLoading(false);
    return false;
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 900));
    const exists = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setError("An account with this email already exists.");
      setLoading(false);
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return false;
    }
    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      role: "Sales Rep",
      avatar: name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2),
    };
    MOCK_USERS.push(newUser);
    setUser(newUser);
    setLoading(false);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, error, loading, login, signup, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
