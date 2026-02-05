import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Termin Buchen',
  description: 'Admin & User Dashboard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="flex flex-col min-h-screen bg-f0f2f5 dark:bg-gray-900">
        <header className="bg-gradient-primary text-white py-6 shadow-md">
          <div className="container flex justify-between items-center">
            <h1 className="text-3xl font-bold">Termin Buchen</h1>
          </div>
        </header>

        <main className="flex-grow container py-12">
          {children}
        </main>

        <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-500">
          © 2026 Vikilux — All rights reserved
        </footer>
      </body>
    </html>
  )
}
