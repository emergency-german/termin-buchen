import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export async function requireAuth(role?: "ADMIN" | "STAFF") {
  const token = cookies().get("token")?.value
  if (!token) throw new Error("Unauthorized")

  const data = await verifyToken(token) // jetzt async korrekt

  if (role && data.role !== role) {
    throw new Error("Forbidden")
  }

  return data
}
