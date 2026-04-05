import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/auth"

export async function GET() {
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

  const db = await prisma.usuario.findUnique({
    where: { id: usuario.id },
    select: { nome: true, whatsapp: true, cidade: true, estado: true, documento: true, tipDoc: true, plano: true },
  })
  if (!db) return NextResponse.json({ error: "Não encontrado." }, { status: 404 })

  return NextResponse.json(db)
}
