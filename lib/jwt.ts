import { SignJWT, jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret")

export async function signToken(payload: { id: string; role: string }, expiresIn = "1h") {
  const exp = Math.floor(Date.now() / 1000) + parseExpiry(expiresIn)
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET)
  return payload as { id: string; role: string; iat: number; exp: number }
}

// Hilfsfunktion, um "1h", "30m", etc. in Sekunden zu konvertieren
function parseExpiry(exp: string): number {
  const match = exp.match(/^(\d+)([smhd])$/)
  if (!match) throw new Error("Invalid expiry format")
  const [, amountStr, unit] = match
  const amount = parseInt(amountStr)
  switch (unit) {
    case "s": return amount
    case "m": return amount * 60
    case "h": return amount * 3600
    case "d": return amount * 86400
    default: throw new Error("Invalid time unit")
  }
}
