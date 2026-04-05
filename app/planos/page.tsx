"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { getPlanosParaTipo, Plano } from "@/lib/planos"

export default function PlanosPage() {
  const router = useRouter()
  const [tipDoc, setTipDoc] = useState<"CPF" | "CNPJ">("CPF")
  const [planos, setPlanos] = useState<Plano[]>([])
  const [carregando, setCarregando] = useState<string | null>(null)

  useEffect(() => {
    setPlanos(getPlanosParaTipo(tipDoc))
  }, [tipDoc])

  async function assinar(planoId: string) {
    if (planoId === "free") return
    setCarregando(planoId)
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planoId }),
      credentials: "include",
    })
    if (res.status === 401) { router.push("/login?redirect=/planos"); return }
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else { alert(data.error || "Erro ao iniciar pagamento."); setCarregando(null) }
  }

  return (
    <>
      <Navbar />
      <main style={s.main}>
        <div style={s.container}>
          <h1 style={s.titulo}>Planos VibeCarros</h1>
          <p style={s.sub}>Mesma exposição dos grandes portais. Alcance regional e nacional.</p>

          {/* Toggle CPF/CNPJ */}
          <div style={s.toggle}>
            <button style={{ ...s.toggleBtn, ...(tipDoc === "CPF" ? s.toggleAtivo : {}) }}
              onClick={() => setTipDoc("CPF")}>👤 Pessoa Física</button>
            <button style={{ ...s.toggleBtn, ...(tipDoc === "CNPJ" ? s.toggleAtivo : {}) }}
              onClick={() => setTipDoc("CNPJ")}>🏢 Pessoa Jurídica</button>
          </div>

          <div style={s.grid}>
            {planos.map(p => (
              <div key={p.id} style={{ ...s.card, ...(p.destaque ? s.cardDestaque : {}) }}>
                {p.destaque && <div style={s.badge}>⭐ Mais popular</div>}
                <h2 style={s.planNome}>{p.nome}</h2>
                <div style={s.preco}>
                  {p.preco === 0
                    ? <span style={s.precoValor}>Grátis</span>
                    : <>
                        <span style={s.precoValor}>R$ {(p.preco / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                        <span style={s.precoLabel}>/mês</span>
                      </>
                  }
                </div>
                <ul style={s.lista}>
                  <li style={s.item}>✅ {p.anuncios === -1 ? "Ilimitados" : p.anuncios} anúncios ativos</li>
                  <li style={s.item}>📷 {p.fotos} fotos por veículo</li>
                  <li style={s.item}>⏱ {p.prazo} dias de exposição</li>
                  <li style={s.item}>🌐 Visibilidade nacional</li>
                  {p.destaque && <li style={s.item}>⭐ Anúncios em destaque</li>}
                </ul>
                {p.preco === 0
                  ? <div style={s.btnGratis}>Plano atual</div>
                  : <button style={{ ...s.btn, opacity: carregando === p.id ? 0.7 : 1 }}
                      onClick={() => assinar(p.id)}
                      disabled={carregando === p.id}>
                      {carregando === p.id ? "Aguarde..." : "Assinar agora"}
                    </button>
                }
              </div>
            ))}
          </div>

          <p style={s.rodape}>
            Ao assinar você concorda com nossos{" "}
            <a href="/termos" style={{ color: "#f5a623" }}>Termos de Uso</a>.
            Cancele quando quiser. Cobrado mensalmente no cartão.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

const s: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "#0f0f0f", padding: "3rem 1rem 4rem" },
  container: { maxWidth: "1000px", margin: "0 auto" },
  titulo: { color: "#fff", fontSize: "2rem", fontWeight: 800, textAlign: "center", margin: "0 0 0.5rem" },
  sub: { color: "#666", textAlign: "center", marginBottom: "2rem" },
  toggle: { display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" },
  toggleBtn: { background: "#1a1a1a", border: "1px solid #333", color: "#888", borderRadius: "8px", padding: "0.6rem 1.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" },
  toggleAtivo: { background: "#f5a623", color: "#000", border: "1px solid #f5a623" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2rem" },
  card: { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "16px", padding: "2rem 1.5rem", position: "relative", display: "flex", flexDirection: "column", gap: "1rem" },
  cardDestaque: { border: "2px solid #f5a623" },
  badge: { position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#f5a623", color: "#000", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "99px", whiteSpace: "nowrap" },
  planNome: { color: "#fff", fontSize: "1.2rem", fontWeight: 700, margin: 0 },
  preco: { display: "flex", alignItems: "baseline", gap: "4px" },
  precoValor: { color: "#f5a623", fontSize: "2rem", fontWeight: 800 },
  precoLabel: { color: "#666", fontSize: "0.9rem" },
  lista: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 },
  item: { color: "#aaa", fontSize: "0.9rem" },
  btn: { background: "#f5a623", color: "#000", border: "none", borderRadius: "8px", padding: "0.875rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem", width: "100%" },
  btnGratis: { background: "#2a2a2a", color: "#666", borderRadius: "8px", padding: "0.875rem", fontWeight: 600, fontSize: "0.9rem", textAlign: "center" },
  rodape: { color: "#444", fontSize: "0.82rem", textAlign: "center", marginTop: "1rem" },
}
