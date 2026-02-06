"use server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Hilfsfunktion für Cookies
async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) return { error: "Bitte alles ausfüllen!" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Email oder Passwort falsch." };
  }

  const token = await signToken({ id: user.id, role: user.role }, "7d");
  await setAuthCookie(token);
  
  redirect("/admin");
}

export async function registerAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) return { error: "Bitte alles ausfüllen!" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Email wird bereits verwendet." };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role: "USER" }
  });

  const token = await signToken({ id: user.id, role: user.role }, "7d");
  await setAuthCookie(token);

  redirect("/admin");
}
