import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// ✅ Add username + password
const INITIAL_USERS = [
  { id: 1, username: "mike",  password: "123456", name: "Mike Campbell", role: "Sales Rep" },
  { id: 2, username: "sarah", password: "123456", name: "Sarah Johnson", role: "Manager" },
  { id: 3, username: "admin", password: "admin123", name: "Admin User", role: "Admin" },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Login with username + password
  const login = async (username, password) => {
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 500)); // faster like ERP

    const found = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      setLoading(false);
      return true;
    }

    setError("Invalid User Name or Password.");
    setLoading(false);
    return false;
  };

  // ✅ Signup (optional for ERP, but kept)
  const signup = async (name, username, password) => {
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 500));

    const exists = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (exists) {
      setError("Username already exists.");
      setLoading(false);
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return false;
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
      name,
      role: "User",
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setLoading(false);

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, loading, login, signup, logout, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);