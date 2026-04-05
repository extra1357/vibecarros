import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { PLANOS } from "@/lib/planos"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Webhook inválido." }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any
    const { usuarioId, planoId } = session.metadata
    const plano = PLANOS[planoId as keyof typeof PLANOS]
    if (!plano) return NextResponse.json({ ok: true })

    const expira = new Date()
    expira.setDate(expira.getDate() + plano.prazo)

    await prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        plano: planoId,
        stripeSubscriptionId: session.subscription,
        planoExpiraEm: expira,
      },
    })
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as any
    await prisma.usuario.updateMany({
      where: { stripeSubscriptionId: sub.id },
      data: { plano: "free", stripeSubscriptionId: null, planoExpiraEm: null },
    })
  }

  return NextResponse.json({ ok: true })
}
