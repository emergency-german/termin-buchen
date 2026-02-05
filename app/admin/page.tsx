import { requireAuth } from "@/lib/auth"

export default function AdminPage() {
  requireAuth("ADMIN")
  return <h1>Admin Dashboard</h1>
}
