import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashSenha, gerarToken } from "@/lib/auth"
import { validarDocumento, detectarTipoDoc, validarCidade } from "@/lib/validacoes"
import { registrarAuditoria, pegarIp } from "@/lib/auditoria"

export async function POST(req: NextRequest) {
  const ip = pegarIp(req)
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
    const docNums = documento.replace(/\D/g, "")
    const tipoDoc = detectarTipoDoc(documento)
    const emailExiste = await prisma.usuario.findUnique({ where: { email } })
    if (emailExiste) {
      await registrarAuditoria({ acao: "REGISTRO_FALHOU", detalhe: `Email duplicado: ${email}`, ip })
      return NextResponse.json({ error: "Email ja cadastrado." }, { status: 409 })
    }
    const docExiste = await prisma.usuario.findUnique({ where: { documento: docNums } })
    if (docExiste) {
      await registrarAuditoria({ acao: "REGISTRO_FALHOU", detalhe: `Documento duplicado: ${docNums}`, ip })
      return NextResponse.json({ error: "Documento ja cadastrado." }, { status: 409 })
    }
    const senhaHash = await hashSenha(senha)
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, documento: docNums, tipDoc: tipoDoc, whatsapp, cidade, estado },
    })
    const token = gerarToken({ id: usuario.id, email: usuario.email, tipoDoc: usuario.tipDoc as "CPF" | "CNPJ" })
    await registrarAuditoria({ usuarioId: usuario.id, acao: "REGISTRO", ip })
    const res = NextResponse.json({ ok: true, nome: usuario.nome }, { status: 201 })
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
    return res
  } catch (error) {
    console.error("POST /api/auth/registro:", error)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
