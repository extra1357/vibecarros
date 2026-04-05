#!/bin/bash
# ─── VibeCarros — Script 04: API Routes ──────────────────────────────────────
# Execute em: ~/vibecarros/vibecarros
# Comando: bash ~/Downloads/04-api-routes.sh

set -e
mkdir -p app/api/auth/registro
mkdir -p app/api/auth/login
mkdir -p app/api/auth/logout
mkdir -p app/api/anuncios

# ── 1. POST /api/auth/registro ────────────────────────────────────────────────
cat > app/api/auth/registro/route.ts << 'EOF'
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashSenha, gerarToken } from "@/lib/auth"
import { validarDocumento, detectarTipoDoc, validarCidade } from "@/lib/validacoes"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, email, senha, documento, whatsapp, cidade, estado } = body

    // Validações básicas
    if (!nome || !email || !senha || !documento || !whatsapp || !cidade || !estado) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 })
    }
    if (senha.length < 6) {
      return NextResponse.json({ error: "Senha deve ter no mínimo 6 caracteres." }, { status: 400 })
    }
    if (!validarDocumento(documento)) {
      return NextResponse.json({ error: "CPF ou CNPJ inválido." }, { status: 400 })
    }
    if (!validarCidade(cidade)) {
      return NextResponse.json({ error: "Cidade fora da área de cobertura." }, { status: 400 })
    }

    const docNums = documento.replace(/\D/g, "")
    const tipoDoc = detectarTipoDoc(documento)

    // Unicidade
    const existe = await prisma.usuario.findFirst({
      where: { OR: [{ email }, { documento: docNums }] },
    })
    if (existe) {
      return NextResponse.json({ error: "Email ou documento já cadastrado." }, { status: 409 })
    }

    const senhaHash = await hashSenha(senha)
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, documento: docNums, tipoDoc, whatsapp, cidade, estado },
    })

    const token = gerarToken({ id: usuario.id, email: usuario.email, tipoDoc: usuario.tipoDoc })

    const res = NextResponse.json({ ok: true, nome: usuario.nome }, { status: 201 })
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    })
    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
EOF

# ── 2. POST /api/auth/login ───────────────────────────────────────────────────
cat > app/api/auth/login/route.ts << 'EOF'
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compararSenha, gerarToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json()

    if (!email || !senha) {
      return NextResponse.json({ error: "Email e senha são obrigatórios." }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 })
    }

    const senhaOk = await compararSenha(senha, usuario.senha)
    if (!senhaOk) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 })
    }

    const token = gerarToken({ id: usuario.id, email: usuario.email, tipoDoc: usuario.tipoDoc })

    const res = NextResponse.json({ ok: true, nome: usuario.nome })
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
EOF

# ── 3. POST /api/auth/logout ──────────────────────────────────────────────────
cat > app/api/auth/logout/route.ts << 'EOF'
import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set("token", "", { maxAge: 0, path: "/" })
  return res
}
EOF

# ── 4. POST /api/anuncios ─────────────────────────────────────────────────────
cat > app/api/anuncios/route.ts << 'EOF'
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/auth"
import { LIMITES } from "@/lib/validacoes"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

const MAX_FOTO_BYTES = 2 * 1024 * 1024 // 2MB

export async function POST(req: NextRequest) {
  try {
    // Auth
    const usuario = getUsuarioLogado()
    if (!usuario) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
    }

    const limites = LIMITES[usuario.tipoDoc]

    // Verifica limite de anúncios no banco (não confia no frontend)
    const totalAtivos = await prisma.anuncio.count({
      where: { usuarioId: usuario.id, status: "ATIVO" },
    })
    if (totalAtivos >= limites.anuncios) {
      return NextResponse.json({
        error: `Limite de ${limites.anuncios} anúncios ativos atingido. Remova ou desative um anúncio antes de criar outro.`,
      }, { status: 422 })
    }

    const form = await req.formData()
    const veiculoRaw = form.get("veiculo") as string
    const veiculo = JSON.parse(veiculoRaw)

    // Fotos
    const fotosEntries = form.getAll("fotos") as File[]
    if (fotosEntries.length > limites.fotos) {
      return NextResponse.json({
        error: `Máximo de ${limites.fotos} fotos permitido.`,
      }, { status: 400 })
    }

    // Salva fotos em /public/uploads (em produção use S3/Cloudflare R2)
    const urlsFotos: string[] = []
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    for (const foto of fotosEntries) {
      if (foto.size > MAX_FOTO_BYTES) {
        return NextResponse.json({ error: `Foto "${foto.name}" ultrapassa 2MB.` }, { status: 400 })
      }
      const buffer = Buffer.from(await foto.arrayBuffer())
      const filename = `${Date.now()}-${foto.name.replace(/[^a-z0-9.]/gi, "_")}`
      await writeFile(path.join(uploadDir, filename), buffer)
      urlsFotos.push(`/uploads/${filename}`)
    }

    // Cria anúncio — expira em 60 dias
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 60)

    const anuncio = await prisma.anuncio.create({
      data: {
        usuarioId: usuario.id,
        categoria: veiculo.categoria,
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        versao: veiculo.versao || null,
        anoFab: Number(veiculo.anoFab),
        anoMod: Number(veiculo.anoMod),
        km: Number(veiculo.km.replace(/\D/g, "")),
        combustivel: veiculo.combustivel,
        cambio: veiculo.cambio,
        cor: veiculo.cor,
        portas: veiculo.portas ? Number(veiculo.portas) : null,
        blindado: Boolean(veiculo.blindado),
        financiamento: Boolean(veiculo.financiamento),
        troca: Boolean(veiculo.troca),
        preco: Number(veiculo.preco.replace(/\D/g, "")),
        fipe: veiculo.fipe ? Number(veiculo.fipe.replace(/\D/g, "")) : null,
        placa: veiculo.placa || null,
        descricao: veiculo.descricao || null,
        expiresAt,
        fotos: {
          create: urlsFotos.map((url, ordem) => ({ url, ordem })),
        },
      },
      include: { fotos: true },
    })

    return NextResponse.json({ ok: true, id: anuncio.id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}

// GET /api/anuncios — listagem pública
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const cidade = searchParams.get("cidade")
    const categoria = searchParams.get("categoria")
    const page = Number(searchParams.get("page") ?? "1")
    const limit = 20

    const where: Record<string, unknown> = {
      status: "ATIVO",
      expiresAt: { gt: new Date() },
    }
    if (cidade) where.usuario = { cidade }
    if (categoria) where.categoria = categoria

    const [anuncios, total] = await Promise.all([
      prisma.anuncio.findMany({
        where,
        include: {
          fotos: { orderBy: { ordem: "asc" }, take: 1 },
          usuario: { select: { nome: true, cidade: true, estado: true, whatsapp: true } },
        },
        orderBy: [{ isFeatured: "desc" }, { criadoEm: "desc" }],
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
EOF

echo "✅ API Routes criadas:"
echo "   POST /api/auth/registro"
echo "   POST /api/auth/login"
echo "   POST /api/auth/logout"
echo "   POST /api/anuncios  (cria anúncio)"
echo "   GET  /api/anuncios  (listagem pública)"
echo ""
echo "👉 Próximo passo: bash 05-middleware.sh"
