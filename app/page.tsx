import Link from "next/link"

export default function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Willkommen zur Terminbuchungs-App</h1>
      <p>
        <Link href="/login">Login</Link>
      </p>
      <p>
        <Link href="/admin">Admin Dashboard</Link>
      </p>
      <p>
        <Link href="/staff">Staff Dashboard</Link>
      </p>
    </div>
  )
}

