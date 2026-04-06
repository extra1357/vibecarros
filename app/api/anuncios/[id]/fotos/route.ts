import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/auth"
import { put } from "@vercel/blob"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

  const anuncio = await prisma.anuncio.findUnique({ where: { id }, include: { fotos: true } })
  if (!anuncio) return NextResponse.json({ error: "Anúncio não encontrado." }, { status: 404 })

  const isAdmin = usuario.email === process.env.ADMIN_EMAIL
  if (anuncio.usuarioId !== usuario.id && !isAdmin)
    return NextResponse.json({ error: "Não autorizado." }, { status: 403 })

  const form = await req.formData()
  const files = form.getAll("fotos") as File[]

  for (const file of files) {
    if (file.size > 15 * 1024 * 1024)
      return NextResponse.json({ error: `Foto "${file.name}" ultrapassa 15MB.` }, { status: 400 })
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
    const filename = `veiculos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const blob = await put(filename, file, { access: "public", contentType: file.type || "image/jpeg" })
    await prisma.foto.create({ data: { anuncioId: id, url: blob.url, ordem: anuncio.fotos.length } })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

  const anuncio = await prisma.anuncio.findUnique({ where: { id } })
  if (!anuncio) return NextResponse.json({ error: "Anúncio não encontrado." }, { status: 404 })

  const isAdmin = usuario.email === process.env.ADMIN_EMAIL
  if (anuncio.usuarioId !== usuario.id && !isAdmin)
    return NextResponse.json({ error: "Não autorizado." }, { status: 403 })

  const { fotoId } = await req.json()
  await prisma.foto.delete({ where: { id: fotoId } })

  return NextResponse.json({ ok: true })
}
