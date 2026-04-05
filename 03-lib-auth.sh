#!/bin/bash
# ─── VibeCarros — Script 03: lib/ (Prisma client, Auth, Validações) ──────────
# Execute em: ~/vibecarros/vibecarros
# Comando: bash ~/Downloads/03-lib-auth.sh

set -e
mkdir -p lib

# ── 1. Prisma Client singleton ────────────────────────────────────────────────
cat > lib/prisma.ts << 'EOF'
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ["error"] })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
EOF

# ── 2. Auth: JWT helpers ──────────────────────────────────────────────────────
cat > lib/auth.ts << 'EOF'
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

// Lê o token do cookie (Server Component / Route Handler)
export function getTokenFromCookie(): string | null {
  try {
    const cookieStore = cookies()
    return cookieStore.get("token")?.value ?? null
  } catch {
    return null
  }
}

export function getUsuarioLogado(): JwtPayload | null {
  const token = getTokenFromCookie()
  if (!token) return null
  try {
    return verificarToken(token)
  } catch {
    return null
  }
}
EOF

# ── 3. Validações CPF/CNPJ (módulo 11) ───────────────────────────────────────
cat > lib/validacoes.ts << 'EOF'
export function validarCPF(cpf: string): boolean {
  const nums = cpf.replace(/\D/g, "")
  if (nums.length !== 11 || /^(\d)\1+$/.test(nums)) return false
  let soma = 0
  for (let i = 0; i < 9; i++) soma += Number(nums[i]) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== Number(nums[9])) return false
  soma = 0
  for (let i = 0; i < 10; i++) soma += Number(nums[i]) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  return resto === Number(nums[10])
}

export function validarCNPJ(cnpj: string): boolean {
  const nums = cnpj.replace(/\D/g, "")
  if (nums.length !== 14 || /^(\d)\1+$/.test(nums)) return false
  const calc = (n: string, pos: number[]) => {
    const soma = pos.reduce((acc, p, i) => acc + Number(n[i]) * p, 0)
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }
  const d1 = calc(nums, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const d2 = calc(nums, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  return d1 === Number(nums[12]) && d2 === Number(nums[13])
}

export function detectarTipoDoc(doc: string): "CPF" | "CNPJ" {
  return doc.replace(/\D/g, "").length <= 11 ? "CPF" : "CNPJ"
}

export function validarDocumento(doc: string): boolean {
  const tipo = detectarTipoDoc(doc)
  return tipo === "CPF" ? validarCPF(doc) : validarCNPJ(doc)
}

export const CIDADES_COBERTURA = ["Itu", "Salto", "Indaiatuba", "Sorocaba", "Porto Feliz"]

export function validarCidade(cidade: string): boolean {
  return CIDADES_COBERTURA.includes(cidade)
}

// Limites por tipo de conta
export const LIMITES = {
  CPF:  { anuncios: 2, fotos: 4 },
  CNPJ: { anuncios: 6, fotos: 6 },
}
EOF

echo "✅ lib/ criada: prisma.ts | auth.ts | validacoes.ts"
echo "👉 Próximo passo: bash 04-api-routes.sh"
