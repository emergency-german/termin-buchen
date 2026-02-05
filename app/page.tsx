"use client"

import { useState } from "react"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Login fehlgeschlagen")

      window.location.href = "/dashboard"
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-10 w-full max-w-md animate-slide-in">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Willkommen zurück
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Noch kein Account?{" "}
          <a href="/register" className="font-semibold text-blue-600 hover:underline">
            Registrieren
          </a>
        </p>
      </div>
    </main>
  )
}
