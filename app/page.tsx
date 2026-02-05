'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login fehlgeschlagen')

      // Erfolgreich eingeloggt → Weiterleitung
      window.location.href = '/dashboard'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-blue-500 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10 animate-fade-in border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
          Willkommen zurück
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
          Bitte melde dich mit deinem Account an
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button
            type="submit"
            className="btn-primary hover:scale-105 transition-transform"
            disabled={loading}
          >
            {loading ? 'Login...' : 'Einloggen'}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 dark:text-gray-500">
          Kein Account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline dark:text-indigo-400">
            Registrieren
          </a>
        </div>
      </div>
    </div>
  )
}
