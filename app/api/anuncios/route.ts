import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/auth"
import { put } from "@vercel/blob"

export async function POST(req: NextRequest) {
  try {
    const usuario = await getUsuarioLogado()
    if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

    const db = await prisma.usuario.findUnique({ where: { id: usuario.id }, select: { plano: true } })
    const { getLimitesPlano } = await import("@/lib/planos")
    const limites = getLimitesPlano(db?.plano ?? "free")

    const totalAtivos = await prisma.anuncio.count({ where: { usuarioId: usuario.id, ativo: true } })
    if (totalAtivos >= limites.anuncios)
      return NextResponse.json({ error: "Limite de anúncios atingido. Faça upgrade do seu plano.", upgrade: true }, { status: 422 })

    const form = await req.formData()
    const veiculoRaw = form.get("veiculo") as string
    const veiculo = JSON.parse(veiculoRaw)
    const fotosEntries = form.getAll("fotos") as File[]

    if (fotosEntries.length > limites.fotos)
      return NextResponse.json({ error: `Máximo de ${limites.fotos} fotos permitido.` }, { status: 400 })

    const urlsFotos: string[] = []
    for (const foto of fotosEntries) {
      if (foto.size > 15 * 1024 * 1024)
        return NextResponse.json({ error: `Foto "${foto.name}" ultrapassa 15MB.` }, { status: 400 })
      const ext = foto.name.split(".").pop()?.toLowerCase() ?? "jpg"
      const filename = `veiculos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const blob = await put(filename, foto, { access: "public", contentType: foto.type || "image/jpeg" })
      urlsFotos.push(blob.url)
    }

    const anuncio = await prisma.anuncio.create({
      data: {
        usuarioId: usuario.id,
        categoria: veiculo.categoria,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        versao: veiculo.versao || null,
        anoFab: Number(veiculo.anoFab),
        anoMod: Number(veiculo.anoMod),
        km: Number(String(veiculo.km).replace(/\D/g, "")),
        combustivel: veiculo.combustivel,
        cambio: veiculo.cambio,
        cor: veiculo.cor,
        portas: veiculo.portas ? Number(veiculo.portas) : null,
        blindado: Boolean(veiculo.blindado),
        financiamento: Boolean(veiculo.financiamento),
        troca: Boolean(veiculo.troca),
        preco: Number(String(veiculo.preco).replace(/\D/g, "")),
        fipe: veiculo.fipe ? Number(String(veiculo.fipe).replace(/\D/g, "")) : null,
        placa: veiculo.placa || null,
        descricao: veiculo.descricao || null,
        ativo: true,
        destaque: false,
        fotos: { create: urlsFotos.map((url, ordem) => ({ url, ordem })) },
      },
      include: { fotos: true },
    })

    return NextResponse.json({ ok: true, id: anuncio.id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const cidade = searchParams.get("cidade")
    const categoria = searchParams.get("categoria")
    const page = Number(searchParams.get("page") ?? "1")
    const limit = 20

    const where: Record<string, unknown> = { ativo: true }
    if (cidade) where.usuario = { cidade }
    if (categoria) where.categoria = categoria

    const [anuncios, total] = await Promise.all([
      prisma.anuncio.findMany({
        where,
        include: {
          fotos: { orderBy: { ordem: "asc" }, take: 1 },
          usuario: { select: { nome: true, cidade: true, estado: true, whatsapp: true } },
        },
        orderBy: [{ destaque: "desc" }, { criadoEm: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.anuncio.count({ where }),
    ])

    return NextResponse.json({ anuncios, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
