import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compararSenha, gerarToken } from "@/lib/auth"
import { registrarAuditoria, pegarIp } from "@/lib/auditoria"

export async function POST(req: NextRequest) {
  const ip = pegarIp(req)
  try {
    const { email, senha } = await req.json()
    if (!email || !senha) {
      return NextResponse.json({ error: "Email e senha obrigatorios." }, { status: 400 })
    }
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
      await registrarAuditoria({ acao: "LOGIN_FALHOU", detalhe: `Email nao encontrado: ${email}`, ip })
      return NextResponse.json({ error: "Credenciais invalidas." }, { status: 401 })
    }
    const ok = await compararSenha(senha, usuario.senha)
    if (!ok) {
      await registrarAuditoria({ usuarioId: usuario.id, acao: "LOGIN_FALHOU", detalhe: "Senha incorreta", ip })
      return NextResponse.json({ error: "Credenciais invalidas." }, { status: 401 })
    }
    const token = gerarToken({ id: usuario.id, email: usuario.email, tipoDoc: usuario.tipDoc as "CPF" | "CNPJ" })
    await registrarAuditoria({ usuarioId: usuario.id, acao: "LOGIN", ip })
    const res = NextResponse.json({ ok: true, nome: usuario.nome }, { status: 200 })
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })
    return res
  } catch (error) {
    console.error("POST /api/auth/login:", error)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
