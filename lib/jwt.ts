import * as jose from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function signToken(payload: { id: string; role: string }, expiresIn = "1h") {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  const { payload } = await jose.jwtVerify(token, SECRET)
  return payload as { id: string; role: string; iat: number; exp: number }
}
