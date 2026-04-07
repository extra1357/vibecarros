import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { pagina, ip } = await req.json()
    await prisma.acesso.create({ data: { pagina, ip } })
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
