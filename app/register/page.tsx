"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Registrierung fehlgeschlagen");
    }
  }

  return (
    <div className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <h1 className="brand-title">Termin buchen</h1>
      </header>

      {/* REGISTER FORM */}
      <main className="login-wrapper">
        <form className="form" onSubmit={handleRegister}>
          <p id="heading">Konto erstellen</p>

          <div className="field">
            <input
              className="input-field"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="btn">
            <button type="submit" className="button1">
              Registrieren
            </button>
            <button
              type="button"
              className="button2"
              onClick={() => (window.location.href = "/")}
            >
              Zurück zum Login
            </button>
          </div>
        </form>
      </main>

      {/* FOOTER */}
      <footer className="page-footer">
        © {new Date().getFullYear()} Termin System • All rights reserved
      </footer>
    </div>
  );
}
