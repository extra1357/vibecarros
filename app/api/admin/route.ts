import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verificarToken } from "@/lib/auth"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value
    if (!token) return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })
    const payload = verificarToken(token)
    if (payload.email !== ADMIN_EMAIL) return NextResponse.json({ error: "Nao autorizado." }, { status: 403 })

    const [
      totalUsuarios,
      totalAnuncios,
      acessosHoje,
      ultimasAuditorias,
      acessosPorPagina,
      acessosPorHora,
      ultimosUsuarios,
    ] = await Promise.all([
      prisma.usuario.count(),
      prisma.anuncio.count(),
      prisma.acesso.count({
        where: { criadoEm: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
      }),
      prisma.auditoria.findMany({
        orderBy: { criadoEm: "desc" },
        take: 50,
      }),
      prisma.acesso.groupBy({
        by: ["pagina"],
        _count: { pagina: true },
        orderBy: { _count: { pagina: "desc" } },
        take: 10,
      }),
      prisma.acesso.groupBy({
        by: ["criadoEm"],
        _count: { criadoEm: true },
        where: { criadoEm: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      }),
      prisma.usuario.findMany({
        orderBy: { criadoEm: "desc" },
        take: 20,
        select: { id: true, nome: true, email: true, cidade: true, plano: true, criadoEm: true, ativo: true }
      }),
    ])

    return NextResponse.json({
      totalUsuarios,
      totalAnuncios,
      acessosHoje,
      ultimasAuditorias,
      acessosPorPagina,
      acessosPorHora,
      ultimosUsuarios,
    })
  } catch (error) {
    console.error("GET /api/admin:", error)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
