import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export function requireAuth(role?: "ADMIN" | "STAFF") {
  const token = cookies().get("token")?.value
  if (!token) throw new Error("Unauthorized")

  const data = verifyToken(token) as any

  if (role && data.role !== role && data.role !== "ADMIN") {
    throw new Error("Forbidden")
  }

  return data
}
