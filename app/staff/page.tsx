import { requireAuth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function StaffPage() {
  await requireAuth("STAFF")

  return (
    <div style={{ padding: 20 }}>
      <h1>Staff Dashboard</h1>
      <p>Hier siehst du deine Termine und kannst Buchungen verwalten.</p>
    </div>
  )
}
