const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PLANOS = [
  { envKey: "STRIPE_PRICE_PF_PLUS", nome: "VibeCarros Plus", descricao: "5 anuncios 10 fotos 60 dias", preco: 3900 },
  { envKey: "STRIPE_PRICE_PF_PRO", nome: "VibeCarros Pro", descricao: "10 anuncios 15 fotos 90 dias Destaque", preco: 7900 },
  { envKey: "STRIPE_PRICE_PJ_STARTER", nome: "VibeCarros Loja Starter", descricao: "20 anuncios 15 fotos 60 dias", preco: 14900 },
  { envKey: "STRIPE_PRICE_PJ_PRO", nome: "VibeCarros Loja Pro", descricao: "50 anuncios 20 fotos 90 dias Destaque", preco: 29900 },
  { envKey: "STRIPE_PRICE_PJ_PREMIUM", nome: "VibeCarros Loja Premium", descricao: "Ilimitado 25 fotos 120 dias", preco: 49900 },
];

async function main() {
  const resultados = [];
  for (const plano of PLANOS) {
    try {
      const produto = await stripe.products.create({ name: plano.nome, description: plano.descricao });
      const preco = await stripe.prices.create({ product: produto.id, unit_amount: plano.preco, currency: "brl", recurring: { interval: "month" } });
      console.log("OK " + plano.nome + " -> " + preco.id);
      resultados.push({ envKey: plano.envKey, priceId: preco.id });
    } catch (err) {
      console.error("ERRO " + plano.nome + ": " + err.message);
    }
  }
  console.log("\n--- Cole no .env ---");
  for (const r of resultados) console.log(r.envKey + "=" + r.priceId);
}

main();
