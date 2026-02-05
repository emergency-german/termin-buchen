import './global.css'
import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Terminbuchung',
  description: 'Web App für Termine, Admin & Mitarbeiter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <header style={headerStyle}>
          <nav style={navStyle}>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/staff">Staff</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer style={footerStyle}>
          &copy; {new Date().getFullYear()} Terminbuchung App
        </footer>
      </body>
    </html>
  )
}

/* Inline-Styles für Header/Footer */
const headerStyle: React.CSSProperties = {
  backgroundColor: '#0070f3',
  color: '#fff',
  padding: '15px 0',
  marginBottom: '20px',
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '15px 0',
  marginTop: '40px',
  borderTop: '1px solid #ccc',
  color: '#555',
}
