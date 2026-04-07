import type { Metadata } from "next"
import CidadeCard from "./CidadeCard"

export const metadata: Metadata = {
  title: "Blog VibeCarros | Guias de Compra de Veículos Usados por Cidade",
  description: "Guias completos de compra de veículos usados para Itu, Salto, Indaiatuba, Sorocaba e Porto Feliz. Dicas de mecânica, elétrica, documentação e como evitar golpes.",
  alternates: { canonical: "https://www.vibecarros.com.br/blog" },
  robots: { index: true, follow: true },
}

const CIDADES = [
  { slug: "sorocaba", nome: "Sorocaba", icone: "🏙️", desc: "Maior mercado da região, com veículos de todos os segmentos." },
  { slug: "indaiatuba", nome: "Indaiatuba", icone: "🏭", desc: "Cidade industrial com alta demanda por veículos confiáveis." },
  { slug: "itu", nome: "Itu", icone: "🏛️", desc: "Mercado tradicional com compradores experientes e exigentes." },
  { slug: "salto", nome: "Salto", icone: "🌊", desc: "Cidade prática com foco em veículos para o dia a dia." },
  { slug: "porto-feliz", nome: "Porto Feliz", icone: "🚜", desc: "Mercado aquecido para pickups e utilitários." },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Blog VibeCarros — Guias por Cidade",
  "description": "Guias de compra de veículos usados para cidades do interior paulista.",
  "url": "https://www.vibecarros.com.br/blog",
  "publisher": { "@type": "Organization", "name": "VibeCarros", "url": "https://www.vibecarros.com.br" },
}

export default function BlogIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ fontFamily: "system-ui,sans-serif", maxWidth: 860, margin: "0 auto", padding: "32px 16px 64px" }}>

        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#1E3A5F", margin: "0 0 12px" }}>
            Guias de Compra de Veículos Usados
          </h1>
          <p style={{ fontSize: 17, color: "#555", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            Dicas reais de mecânica, elétrica, documentação e segurança para comprar um carro usado em cada cidade que a VibeCarros atende.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
          {CIDADES.map((c) => (
            <CidadeCard key={c.slug} {...c} />
          ))}
        </div>

      </div>
    </>
  )
}
