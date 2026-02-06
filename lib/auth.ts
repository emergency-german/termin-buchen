import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function requireAuth(role?: "ADMIN" | "STAFF") {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const data = await verifyToken(token);

  if (role && data.role !== role) {
    throw new Error("Forbidden");
  }

  return data;
}
