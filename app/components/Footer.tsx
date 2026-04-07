"use client"
import Link from "next/link"

const CIDADES_BLOG = [
  { slug: "sorocaba", nome: "Sorocaba" },
  { slug: "indaiatuba", nome: "Indaiatuba" },
  { slug: "itu", nome: "Itu" },
  { slug: "salto", nome: "Salto" },
  { slug: "porto-feliz", nome: "Porto Feliz" },
]

export default function Footer() {
  return (
    <footer style={{ background: "#0f2240", color: "#cdd9e8", fontSize: 14, marginTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32 }}>

        {/* MARCA */}
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 10 }}>🚗 VibeCarros</div>
          <p style={{ lineHeight: 1.7, color: "#8fa8c0", fontSize: 13, margin: 0 }}>
            Marketplace regional de veículos com comparação FIPE automática. Transparência real para comprador e vendedor.
          </p>
        </div>

        {/* GUIAS POR CIDADE */}
        <div>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Guias por Cidade
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {CIDADES_BLOG.map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/${c.slug}`}
                  style={{ color: "#8fa8c0", textDecoration: "none", fontSize: 14, transition: "color .15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8fa8c0")}>
                  Comprar carro em {c.nome}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog"
                style={{ color: "#4a9eff", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a9eff")}>
                Ver todos os guias →
              </Link>
            </li>
          </ul>
        </div>

        {/* LINKS RÁPIDOS */}
        <div>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Links Rápidos
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { href: "/", label: "Início" },
              { href: "/anunciar", label: "Anunciar Veículo" },
              { href: "/planos", label: "Planos e Preços" },
              { href: "/login", label: "Entrar" },
              { href: "/registro", label: "Cadastrar" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href}
                  style={{ color: "#8fa8c0", textDecoration: "none", fontSize: 14 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8fa8c0")}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* AVISO LEGAL */}
        <div>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Aviso Legal
          </div>
          <p style={{ color: "#8fa8c0", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
            A VibeCarros é uma plataforma de anúncios. As informações dos veículos são cadastradas pelos próprios anunciantes. A VibeCarros não se responsabiliza por informações incorretas, ações de má-fé ou negociações realizadas entre as partes. Negocie sempre com cautela.
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div style={{ borderTop: "1px solid #1e3a5f", padding: "16px 20px", maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ color: "#8fa8c0", fontSize: 12 }}>
          © {new Date().getFullYear()} VibeCarros · Itu, Salto, Indaiatuba, Sorocaba e Porto Feliz · SP
        </span>
        <span style={{ color: "#8fa8c0", fontSize: 12 }}>
          Feito com 🚗 no interior paulista
        </span>
      </div>
    </footer>
  )
}
