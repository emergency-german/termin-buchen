"use client"; // damit wir clientseitige Events nutzen können

import { useState } from "react";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Direkte Prüfung in der Page
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        setError("User not found");
        return;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        setError("Invalid password");
        return;
      }

      const token = await signToken({ id: user.id, role: user.role }, "7d");

      // Cookie setzen (clientseitig nicht optimal, besser via API, aber geht auch hier)
      document.cookie = `token=${token}; path=/; HttpOnly`;

      setError("");
      alert("Login successful!"); // später redirect zu /admin oder /dashboard

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="form" onSubmit={handleLogin}>
        <p id="heading">Login</p>
        <div className="field">
          <input
            placeholder="Email"
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className="btn">
          <button className="button1" type="submit">Login</button>
          <button className="button2" type="button">Sign Up</button>
        </div>
        <button className="button3">Forgot Password</button>
      </form>
    </div>
  );
}
