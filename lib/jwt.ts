import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "supersecretkey"

// Token erzeugen
export function signToken(payload: { id: string; role: string }, expiresIn = "1h") {
  return jwt.sign(payload, SECRET, { expiresIn })
}

// Token prüfen
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { id: string; role: string; iat: number; exp: number }
  } catch (err) {
    throw new Error("Invalid token")
  }
}
