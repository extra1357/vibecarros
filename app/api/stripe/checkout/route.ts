import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { getUsuarioLogado } from "@/lib/auth"
import { PLANOS } from "@/lib/planos"

export async function POST(req: NextRequest) {
  const usuario = await getUsuarioLogado()
  if (!usuario) return NextResponse.json({ error: "Não autorizado." }, { status: 401 })

  const { planoId } = await req.json()
  const plano = PLANOS[planoId as keyof typeof PLANOS]
  if (!plano || plano.preco === 0) return NextResponse.json({ error: "Plano inválido." }, { status: 400 })

  const db = await prisma.usuario.findUnique({ where: { id: usuario.id } })
  if (!db) return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 })

  // Cria ou recupera customer no Stripe
  let customerId = db.stripeCustomerId
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: db.email,
      name: db.nome,
      metadata: { usuarioId: db.id },
    })
    customerId = customer.id
    await prisma.usuario.update({ where: { id: db.id }, data: { stripeCustomerId: customerId } })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: plano.stripePriceId, quantity: 1 }],
    success_url: `${appUrl}/painel?sucesso=1`,
    cancel_url: `${appUrl}/planos`,
    metadata: { usuarioId: db.id, planoId },
    consent_collection: { terms_of_service: "required" },
  })

  return NextResponse.json({ url: session.url })
}
