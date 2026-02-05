"use client"

import { useState } from "react"

export default function AppointmentPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("✅ Termin erfolgreich gespeichert!")
        setName("")
        setEmail("")
        setDate("")
      } else {
        setMessage(`⚠ Fehler: ${data.error || "Unbekannt"}`)
      }
    } catch (err) {
      console.error(err)
      setMessage("⚠ Netzwerkfehler")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Termin beantragen</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          placeholder="Datum & Uhrzeit"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Senden..." : "Termin beantragen"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
