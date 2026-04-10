import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

import tzumiLogo from "../assets/tzumi.jpg";
import amgLogo from "../assets/amg.jpg";
import enchlogo from "../assets/ench.jpg";
import enltelogo from "../assets/enlte.jpg";

import flagUS from "../assets/flags/us.png";
import flagCA from "../assets/flags/ca.png";
import flagCN from "../assets/flags/cn.png";
import flagIL from "../assets/flags/il.png";
import flagIN from "../assets/flags/in.png";
import flagPK from "../assets/flags/pk.png";
import flagPR from "../assets/flags/pr.png";
import flagHK from "../assets/flags/hk.png";

const FLAGS = [
  { code: "US", img: flagUS },
  { code: "CA", img: flagCA },
  { code: "CN", img: flagCN },
  { code: "IL", img: flagIL },
  { code: "IN", img: flagIN },
  { code: "PK", img: flagPK },
  { code: "PR", img: flagPR },
  { code: "HK", img: flagHK },
];

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export default function AuthPage() {
  const [view, setView] = useState("login");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#f5f5f5", // removed outer grey rectangle look
      }}
    >
      {/* HEADER */}
      <div
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          borderBottom: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={enchlogo} alt="ENCH" style={{ height: 28 }} />
          <img src={tzumiLogo} alt="TZUMI" style={{ height: 28 }} />
          <img src={enltelogo} alt="ENLTE" style={{ height: 28 }} />
          <img src={amgLogo} alt="AMG" style={{ height: 28 }} />

          <span style={{ fontSize: 13, color: "#555" }}>
             
          </span>
        </div>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 16,
            fontSize: 13,
          }}
        >
          <span>{TODAY}</span>

          <span>
            Powered By <strong style={{ color: "#1a4fa0" }}>GenSoft Corp</strong>
          </span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 12px",
        }}
      >
        {/* LOGIN CARD */}
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "#fff",
            borderRadius: 10,
            padding: "24px 28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid #dcd7cf",
          }}
        >
          {view === "login" ? (
            <LoginPage onGoSignup={() => setView("signup")} />
          ) : (
            <SignupPage onGoLogin={() => setView("login")} />
          )}
        </div>

        {/* FLAGS */}
        <div
          style={{
            marginTop: 14,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {FLAGS.map(({ code, img }) => (
              <img
                key={code}
                src={img}
                alt={code}
                style={{
                  width: 40,
                  height: 26,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: 12,
              color: "#1a4fa0",
              marginTop: 6,
            }}
          >
            <strong style={{ textDecoration: "underline", cursor: "pointer" }}>
              Enchante Accessories
            </strong>{" "}
            16 East 34th St. New York NY 10016
          </p>
        </div>
      </div>
    </div>
  );
}