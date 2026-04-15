"use client"
import Link from "next/link"

interface Props {
  id: string
  marca: string
  modelo: string
  anoFab: number
  anoMod: number
  km: number | null
  preco: number
  fotoUrl: string | null
  nomeCidade: string
  vendidoEm?: string | null
}

export default function VeiculoCard({ id, marca, modelo, anoFab, anoMod, km, preco, fotoUrl, nomeCidade, vendidoEm }: Props) {
  const jaVendido = !!vendidoEm
  return (
    <Link href={jaVendido ? "#" : "/anuncio/" + id} style={{ textDecoration: "none", color: "inherit", pointerEvents: jaVendido ? "none" : "auto" }}>
      <article
        style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", background: "#fff", transition: "box-shadow .15s", opacity: jaVendido ? 0.85 : 1 }}
        onMouseEnter={(e) => { if (!jaVendido) e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)" }}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div style={{ width: "100%", height: 160, background: "#f0f4f8", overflow: "hidden", position: "relative" }}>
          {fotoUrl ? (
            <img
              src={fotoUrl}
              alt={marca + " " + modelo + " a venda em " + nomeCidade}
              loading="lazy"
              decoding="async"
              width={320} height={160}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 32 }}>🚗</div>
          )}
          {jaVendido && (
            <div style={{ position: "absolute", top: 22, left: -30, width: "130px", background: "#ef4444", transform: "rotate(-45deg)", textAlign: "center", padding: "4px 0", zIndex: 2 }}>
              <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em" }}>VENDIDO</span>
            </div>
          )}
        </div>
        <div style={{ padding: "12px 14px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{marca} {modelo}</div>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 6 }}>{anoFab}/{anoMod} · {km?.toLocaleString("pt-BR")} km</div>
          <div style={{ fontWeight: 800, fontSize: 17, color: jaVendido ? "#ef4444" : "#1a7a4a" }}>
            {jaVendido ? "VENDIDO" : "R$ " + Number(preco).toLocaleString("pt-BR")}
          </div>
        </div>
      </article>
    </Link>
  )
}
