import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verificarToken } from "@/lib/auth"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!

function checarAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) return false
  const payload = verificarToken(token)
  return payload.email === ADMIN_EMAIL
}

export async function GET(req: NextRequest) {
  try {
    if (!checarAdmin(req)) return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })
    const { searchParams } = new URL(req.url)
    const aba = searchParams.get("aba") ?? "resumo"

    if (aba === "anuncios") {
      const anuncios = await prisma.anuncio.findMany({
        orderBy: { criadoEm: "desc" },
        take: 100,
        include: {
          fotos: { orderBy: { ordem: "asc" } },
          usuario: { select: { nome: true, email: true, cidade: true, whatsapp: true } },
        },
      })
      return NextResponse.json({ anuncios })
    }

    if (aba === "usuarios") {
      const usuarios = await prisma.usuario.findMany({
        orderBy: { criadoEm: "desc" },
        take: 100,
        select: { id: true, nome: true, email: true, cidade: true, estado: true, plano: true, ativo: true, criadoEm: true, whatsapp: true, tipDoc: true },
      })
      return NextResponse.json({ usuarios })
    }

    const [totalUsuarios, totalAnuncios, acessosHoje, ultimasAuditorias, acessosPorPagina, ultimosUsuarios] =
      await Promise.all([
        prisma.usuario.count(),
        prisma.anuncio.count(),
        prisma.acesso.count({ where: { criadoEm: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
        prisma.auditoria.findMany({ orderBy: { criadoEm: "desc" }, take: 50 }),
        prisma.acesso.groupBy({ by: ["pagina"], _count: { pagina: true }, orderBy: { _count: { pagina: "desc" } }, take: 10 }),
        prisma.usuario.findMany({ orderBy: { criadoEm: "desc" }, take: 20, select: { id: true, nome: true, email: true, cidade: true, plano: true, criadoEm: true, ativo: true } }),
      ])

    return NextResponse.json({ totalUsuarios, totalAnuncios, acessosHoje, ultimasAuditorias, acessosPorPagina, ultimosUsuarios })
  } catch (error) {
    console.error("GET /api/admin:", error)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!checarAdmin(req)) return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })
    const body = await req.json()
    const { tipo, id, acao, valor } = body

    if (tipo === "anuncio") {
      if (acao === "ativar") await prisma.anuncio.update({ where: { id }, data: { ativo: true } })
      if (acao === "inativar") await prisma.anuncio.update({ where: { id }, data: { ativo: false } })
      if (acao === "destaque") await prisma.anuncio.update({ where: { id }, data: { destaque: valor } })
      if (acao === "deletar") await prisma.anuncio.delete({ where: { id } })
      if (acao === "deletarFoto") await prisma.foto.delete({ where: { id: valor } })
      if (acao === "vendido") await prisma.anuncio.update({ where: { id }, data: { vendidoEm: new Date(), ativo: false } })
    }

    if (tipo === "usuario") {
      if (acao === "suspender") await prisma.usuario.update({ where: { id }, data: { ativo: false } })
      if (acao === "ativar") await prisma.usuario.update({ where: { id }, data: { ativo: true } })
      if (acao === "plano") await prisma.usuario.update({ where: { id }, data: { plano: valor } })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("PATCH /api/admin:", error)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
