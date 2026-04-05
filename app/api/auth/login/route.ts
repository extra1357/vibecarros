import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compararSenha, gerarToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json()
    if (!email || !senha) {
      return NextResponse.json({ error: "Email e senha obrigatorios." }, { status: 400 })
    }
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
      return NextResponse.json({ error: "Credenciais invalidas." }, { status: 401 })
    }
    const ok = await compararSenha(senha, usuario.senha)
    if (!ok) {
      return NextResponse.json({ error: "Credenciais invalidas." }, { status: 401 })
    }
    const token = gerarToken({ id: usuario.id, email: usuario.email, tipoDoc: usuario.tipDoc as "CPF" | "CNPJ" })
    const res = NextResponse.json({ ok: true, nome: usuario.nome }, { status: 200 })
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
