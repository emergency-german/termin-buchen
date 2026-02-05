import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export async function requireAuth(role?: "ADMIN" | "STAFF") {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) throw new Error("Unauthorized")

  // ⚡ await hinzufügen, da verifyToken ein Promise zurückgibt
  const data = await verifyToken(token) as { id: string; role: string; iat: number; exp: number }

  if (role && data.role !== role) {
    throw new Error("Forbidden")
  }

  return data
}
