import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/auth"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })

  const { id } = await params
  const anuncio = await prisma.anuncio.findUnique({ where: { id }, include: { fotos: true } })
  if (!anuncio) return NextResponse.json({ error: "Anuncio nao encontrado." }, { status: 404 })
  if (anuncio.usuarioId !== usuario.id) return NextResponse.json({ error: "Sem permissao." }, { status: 403 })

  await prisma.foto.deleteMany({ where: { anuncioId: id } })
  await prisma.anuncio.delete({ where: { id } })

  return NextResponse.json({ ok: true })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Nao autorizado." }, { status: 401 })

  const { id } = await params
  const anuncio = await prisma.anuncio.findUnique({ where: { id } })
  if (!anuncio) return NextResponse.json({ error: "Anuncio nao encontrado." }, { status: 404 })
  if (anuncio.usuarioId !== usuario.id) return NextResponse.json({ error: "Sem permissao." }, { status: 403 })

  const { acao } = await req.json()

  if (acao === "inativar") {
    await prisma.anuncio.update({ where: { id }, data: { ativo: false } })
    return NextResponse.json({ ok: true })
  }
  if (acao === "ativar") {
    await prisma.anuncio.update({ where: { id }, data: { ativo: true } })
    return NextResponse.json({ ok: true })
  }
  if (acao === "vendido") {
    await prisma.anuncio.update({ where: { id }, data: { ativo: false, destaque: false } })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: "Acao invalida." }, { status: 400 })
}
