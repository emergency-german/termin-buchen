import { requireAuth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  await requireAuth("ADMIN")

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <p>Hier kannst du Mitarbeiter verwalten und Termine sehen.</p>
    </div>
  )
}
