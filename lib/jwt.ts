// /lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

/**
 * signToken(payload, expiresIn)
 * - payload: { id, role }
 * - expiresIn: string like "1h", "30m", "10s", "1d"
 */
export async function signToken(
  payload: { id: string; role: string },
  expiresIn = "1h"
): Promise<string> {
  const expSeconds = Math.floor(Date.now() / 1000) + parseExpiry(expiresIn);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expSeconds)
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET);
  return payload as { id: string; role: string; iat?: number; exp?: number };
}

function parseExpiry(exp: string): number {
  const m = exp.match(/^(\d+)([smhd])$/);
  if (!m) throw new Error("Invalid expiry format. Use number + s|m|h|d, e.g. 1h");
  const amount = parseInt(m[1], 10);
  const unit = m[2];
  switch (unit) {
    case "s":
      return amount;
    case "m":
      return amount * 60;
    case "h":
      return amount * 3600;
    case "d":
      return amount * 86400;
    default:
      throw new Error("Invalid time unit");
  }
}
