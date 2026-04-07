"use client"
import Link from "next/link"

interface Props {
  slug: string
  nome: string
  icone: string
  desc: string
}

export default function CidadeCard({ slug, nome, icone, desc }: Props) {
  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <article
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 24,
          background: "#fff",
          height: "100%",
          transition: "box-shadow .15s, transform .15s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.10)"
          e.currentTarget.style.transform = "translateY(-2px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none"
          e.currentTarget.style.transform = "none"
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>{icone}</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1E3A5F", margin: "0 0 8px" }}>
          Comprar Carro em {nome}
        </h2>
        <p style={{ fontSize: 14, color: "#666", margin: "0 0 16px", lineHeight: 1.6 }}>{desc}</p>
        <span style={{ fontSize: 13, color: "#1E3A5F", fontWeight: 700 }}>Ler guia completo →</span>
      </article>
    </Link>
  )
}
