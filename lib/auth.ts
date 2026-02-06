import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function requireAuth(role?: "ADMIN" | "STAFF") {
  const cookieStore = await cookies(); // ✅ WICHTIG
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = await verifyToken(token);

  if (role && payload.role !== role) {
    throw new Error("Forbidden");
  }

  return payload;
}
