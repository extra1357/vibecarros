import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashSenha, gerarToken } from "@/lib/auth"
import { validarDocumento, detectarTipoDoc, validarCidade } from "@/lib/validacoes"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, email, senha, documento, whatsapp, cidade, estado } = body
    if (!nome || !email || !senha || !documento || !whatsapp || !cidade || !estado) {
      return NextResponse.json({ error: "Todos os campos sao obrigatorios." }, { status: 400 })
    }
    if (senha.length < 6) {
      return NextResponse.json({ error: "Senha deve ter no minimo 6 caracteres." }, { status: 400 })
    }
    if (!validarDocumento(documento)) {
      return NextResponse.json({ error: "CPF ou CNPJ invalido." }, { status: 400 })
    }
    if (!validarCidade(cidade)) {
      return NextResponse.json({ error: "Cidade fora da area de cobertura." }, { status: 400 })
    }
    const docNums = documento.replace(/\D/g, "")
    const tipDoc = detectarTipoDoc(documento)
    const existe = await prisma.usuario.findFirst({
      where: { OR: [{ email }, { documento: docNums }] },
    })
    if (existe) {
      return NextResponse.json({ error: "Email ou documento ja cadastrado." }, { status: 409 })
    }
    const senhaHash = await hashSenha(senha)
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, documento: docNums, tipDoc, whatsapp, cidade, estado },
    })
    const token = gerarToken({ id: usuario.id, email: usuario.email, tipoDoc: usuario.tipDoc as "CPF" | "CNPJ" })
    const res = NextResponse.json({ ok: true, nome: usuario.nome }, { status: 201 })
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
