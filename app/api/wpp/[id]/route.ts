import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const anuncio = await prisma.anuncio.findUnique({
    where: { id: params.id, ativo: true },
    include: { usuario: { select: { whatsapp: true } } },
  })
  if (!anuncio) return NextResponse.json({ error: "Não encontrado." }, { status: 404 })
  const numero = anuncio.usuario.whatsapp.replace(/\D/g, "")
  const titulo = `${anuncio.marca} ${anuncio.modelo} ${anuncio.anoMod}`
  const msg = encodeURIComponent(`Olá! Tenho interesse no ${titulo} anunciado no VibeCarros.`)
  return NextResponse.redirect(`https://wa.me/55${numero}?text=${msg}`)
}
