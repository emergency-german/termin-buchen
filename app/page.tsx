"use client" // komplett client-seitig

export default function Home() {
  // Kein requireAuth, kein cookies
  return (
    <main>
      <h1>Termin buchen</h1>
      <p>Öffentliche Seite für Kunden</p>
    </main>
  )
}
