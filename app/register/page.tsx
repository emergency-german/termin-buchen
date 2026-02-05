"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Registrierung fehlgeschlagen")

      window.location.href = "/"
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-yellow-400 to-red-400">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-10 w-full max-w-md animate-slide-in">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Erstelle einen Account
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn mt-2" disabled={loading}>
            {loading ? "Registrieren..." : "Registrieren"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Schon registriert?{" "}
          <a href="/" className="font-semibold text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  )
}
