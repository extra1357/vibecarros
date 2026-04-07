import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { pagina, ip } = await req.json()

    const inicioDia = new Date()
    inicioDia.setHours(0, 0, 0, 0)

    // Só registra se ainda não houve acesso desse IP nessa página hoje
    const jaExiste = await prisma.acesso.findFirst({
      where: {
        pagina,
        ip,
        criadoEm: { gte: inicioDia },
      },
    })

    if (!jaExiste) {
      await prisma.acesso.create({ data: { pagina, ip } })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}

export async function GET() {
  try {
    const total = await prisma.acesso.count()
    return NextResponse.json({ total })
  } catch {
    return NextResponse.json({ total: 0 })
  }
}
