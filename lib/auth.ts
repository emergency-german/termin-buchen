// /lib/auth.ts
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

/**
 * requireAuth(role?)
 * - role optional: "ADMIN" | "STAFF"
 * - throws Error("Unauthorized") when no token
 * - throws Error("Forbidden") when role mismatch
 * - returns payload { id, role, ... }
 */
export async function requireAuth(role?: "ADMIN" | "STAFF") {
  // cookies() can be async in your environment -> await it
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const data = await verifyToken(token);

  if (role && data.role !== role && data.role !== "ADMIN") {
    // allow ADMIN as superset, adjust if you want strict equality
    throw new Error("Forbidden");
  }

  return data as { id: string; role: string; iat?: number; exp?: number };
}

