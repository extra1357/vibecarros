import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/auth"

export async function GET() {
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

  const anuncios = await prisma.anuncio.findMany({
    where: { usuarioId: usuario.id },
    include: { fotos: { orderBy: { ordem: "asc" }, take: 1 } },
    orderBy: { criadoEm: "desc" },
  })

  const db = await prisma.usuario.findUnique({
    where: { id: usuario.id },
    select: { tipDoc: true, plano: true },
  })

  return NextResponse.json({ anuncios, tipoDoc: db?.tipDoc, plano: db?.plano })
}

export async function PATCH(req: NextRequest) {
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

  const { id, acao } = await req.json()

  const anuncio = await prisma.anuncio.findFirst({ where: { id, usuarioId: usuario.id } })
  if (!anuncio) return NextResponse.json({ error: "Anúncio não encontrado." }, { status: 404 })

  if (acao === "deletar") {
    await prisma.foto.deleteMany({ where: { anuncioId: id } })
    await prisma.anuncio.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  }

  if (acao === "inativar") {
    await prisma.anuncio.update({ where: { id }, data: { ativo: false } })
    return NextResponse.json({ ok: true })
  }

  if (acao === "ativar") {
    await prisma.anuncio.update({ where: { id }, data: { ativo: true } })
    return NextResponse.json({ ok: true })
  }

  if (acao === "vendido") {
    await prisma.anuncio.update({ where: { id }, data: { vendidoEm: new Date(), ativo: false } })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: "Ação inválida." }, { status: 400 })
}
