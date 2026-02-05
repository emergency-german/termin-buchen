export const dynamic = "force-dynamic"; 

import { requireAuth } from "@/lib/auth"

export default function StaffPage() {
  requireAuth("STAFF")
  return <h1>Mitarbeiter Dashboard</h1>
}
