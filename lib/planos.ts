export type PlanoId = "free" | "pf_plus" | "pf_pro" | "pj_starter" | "pj_pro" | "pj_premium"

export interface Plano {
  id: PlanoId
  nome: string
  preco: number // centavos
  anuncios: number // -1 = ilimitado
  fotos: number
  prazo: number // dias
  tipoConta: "CPF" | "CNPJ" | "ambos"
  destaque: boolean
  stripePriceId: string
}

export const PLANOS: Record<PlanoId, Plano> = {
  free: {
    id: "free",
    nome: "Gratuito",
    preco: 0,
    anuncios: 2,
    fotos: 4,
    prazo: 30,
    tipoConta: "ambos",
    destaque: false,
    stripePriceId: "",
  },
  pf_plus: {
    id: "pf_plus",
    nome: "Plus",
    preco: 3900,
    anuncios: 5,
    fotos: 10,
    prazo: 60,
    tipoConta: "CPF",
    destaque: false,
    stripePriceId: process.env.STRIPE_PRICE_PF_PLUS!,
  },
  pf_pro: {
    id: "pf_pro",
    nome: "Pro",
    preco: 7900,
    anuncios: 10,
    fotos: 15,
    prazo: 90,
    tipoConta: "CPF",
    destaque: true,
    stripePriceId: process.env.STRIPE_PRICE_PF_PRO!,
  },
  pj_starter: {
    id: "pj_starter",
    nome: "Loja Starter",
    preco: 14900,
    anuncios: 20,
    fotos: 15,
    prazo: 60,
    tipoConta: "CNPJ",
    destaque: false,
    stripePriceId: process.env.STRIPE_PRICE_PJ_STARTER!,
  },
  pj_pro: {
    id: "pj_pro",
    nome: "Loja Pro",
    preco: 29900,
    anuncios: 50,
    fotos: 20,
    prazo: 90,
    tipoConta: "CNPJ",
    destaque: true,
    stripePriceId: process.env.STRIPE_PRICE_PJ_PRO!,
  },
  pj_premium: {
    id: "pj_premium",
    nome: "Loja Premium",
    preco: 49900,
    anuncios: -1,
    fotos: 25,
    prazo: 120,
    tipoConta: "CNPJ",
    destaque: true,
    stripePriceId: process.env.STRIPE_PRICE_PJ_PREMIUM!,
  },
}

export function getPlanosParaTipo(tipDoc: "CPF" | "CNPJ"): Plano[] {
  return Object.values(PLANOS).filter(
    p => p.tipoConta === tipDoc || p.tipoConta === "ambos"
  )
}

export function getLimitesPlano(planoId: string) {
  const plano = PLANOS[planoId as PlanoId] ?? PLANOS.free
  return {
    anuncios: plano.anuncios === -1 ? Infinity : plano.anuncios,
    fotos: plano.fotos,
    prazo: plano.prazo,
  }
}
