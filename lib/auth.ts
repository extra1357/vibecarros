import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const SECRET = process.env.JWT_SECRET!
const EXPIRES = process.env.JWT_EXPIRES_IN ?? "7d"

export interface JwtPayload {
  id: string
  email: string
  tipoDoc: "CPF" | "CNPJ"
}

export function gerarToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES } as jwt.SignOptions)
}

export function verificarToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload
}

export async function hashSenha(senha: string): Promise<string> {
  return bcrypt.hash(senha, 12)
}

export async function compararSenha(senha: string, hash: string): Promise<boolean> {
  return bcrypt.compare(senha, hash)
}

export async function getTokenFromCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get("token")?.value ?? null
  } catch {
    return null
  }
}

export async function getUsuarioLogado(): Promise<JwtPayload | null> {
  const token = await getTokenFromCookie()
  if (!token) return null
  try {
    return verificarToken(token)
  } catch {
    return null
  }
}

export const LIMITES = {
  CPF:  { anuncios: 2, fotos: 4 },
  CNPJ: { anuncios: 6, fotos: 6 },
}
