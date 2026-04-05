import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export function pegarIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido"
}

export async function registrarAuditoria({
  usuarioId,
  acao,
  detalhe,
  ip,
}: {
  usuarioId?: string
  acao: string
  detalhe?: string
  ip?: string
}) {
  try {
    await prisma.auditoria.create({
      data: { usuarioId, acao, detalhe, ip },
    })
  } catch (e) {
    console.error("Erro ao registrar auditoria:", e)
  }
}

export async function registrarAcesso(pagina: string, ip?: string) {
  try {
    await prisma.acesso.create({
      data: { pagina, ip },
    })
  } catch (e) {
    console.error("Erro ao registrar acesso:", e)
  }
}
