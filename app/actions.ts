"use server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) return { error: "Email und Passwort benötigt" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "User nicht gefunden" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: "Falsches Passwort" };

  const token = await signToken({ id: user.id, role: user.role }, "7d");

  // In Next.js 15+ ist cookies() async
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}
