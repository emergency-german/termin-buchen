import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: { id: string; role: string }, expiresIn = "1h") {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as { id: string; role: string; iat: number; exp: number };
}
