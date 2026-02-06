"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registrierung fehlgeschlagen");
        return;
      }

      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Server Fehler");
    }
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="brand-title">Termin buchen</h1>
      </header>

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
              onClick={() => router.push("/")}
            >
              Zurück
            </button>
          </div>
        </form>
      </main>

      <footer className="page-footer">
        © {new Date().getFullYear()} Termin System
      </footer>
    </div>
  );
}
