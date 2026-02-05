import { SignJWT, jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecretkey")

export async function signToken(payload: { id: string; role: string }, expiresIn = "1h") {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(SECRET)

  return token
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { id: string; role: string; iat: number; exp: number }
  } catch (err) {
    throw new Error("Invalid token")
  }
}
