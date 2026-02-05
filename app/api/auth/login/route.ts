// /app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body as { email: string; password: string };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await signToken({ id: user.id, role: user.role }, "7d");

  const res = NextResponse.json({ success: true });
  // set cookie with the final token string
  res.cookies.set("token", token, { httpOnly: true, path: "/" });

  return res;
}
