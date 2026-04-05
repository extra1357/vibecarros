"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const LIMITES = { CPF: { anuncios: 2, fotos: 4 }, CNPJ: { anuncios: 6, fotos: 6 } }

interface Anuncio {
  id: string; marca: string; modelo: string; anoMod: number; preco: number
  ativo: boolean; criadoEm: string; fotos: { url: string }[]
}

export default function PainelPage() {
  const router = useRouter()
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [tipoDoc, setTipoDoc] = useState<"CPF" | "CNPJ">("CPF")
  const [loading, setLoading] = useState(true)

  async function carregar() {
    const res = await fetch("/api/painel/anuncios")
    if (res.status === 401) { router.push("/login"); return }
    const data = await res.json()
    setAnuncios(data.anuncios)
    setTipoDoc(data.tipoDoc)
    setLoading(false)
  }

  useEffect(() => { carregar() }, [])

  async function acao(id: string, a: string) {
    await fetch("/api/painel/anuncios", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, acao: a }),
    })
    carregar()
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  const limite = LIMITES[tipoDoc] ?? LIMITES.CPF
  const ativos = anuncios.filter(a => a.ativo).length
  const limiteAtingido = ativos >= limite.anuncios

  if (loading) return <main style={s.main}><p style={{ color: "#888", textAlign: "center" }}>Carregando...</p></main>

  return (
    <main style={s.main}>
      <div style={s.container}>
        <div style={s.header}>
          <div>
            <h1 style={s.titulo}>Meu Painel</h1>
            <p style={s.sub}>
              {ativos}/{limite.anuncios} anúncios ativos · {tipoDoc === "CNPJ" ? "🏢 Loja/PJ" : "👤 Pessoa Física"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {limiteAtingido ? (
              <div style={s.btnBloqueado}>Limite atingido</div>
            ) : (
              <Link href="/anunciar" style={s.btnNovo}>+ Novo Anúncio</Link>
            )}
            <button onClick={logout} style={s.btnLogout}>Sair</button>
          </div>
        </div>

        <div style={s.barraWrapper}>
          <div style={s.barraFundo}>
            <div style={{ ...s.barraCheia, width: `${(ativos / limite.anuncios) * 100}%` }} />
          </div>
          <span style={s.barraLabel}>{ativos} de {limite.anuncios} slots usados</span>
        </div>

        {anuncios.length === 0 && (
          <div style={s.vazio}>
            <p>Você ainda não tem anúncios.</p>
            <Link href="/anunciar" style={s.btnNovo}>Criar primeiro anúncio</Link>
          </div>
        )}

        <div style={s.lista}>
          {anuncios.map(a => (
            <div key={a.id} style={s.card}>
              <div style={s.cardImg}>
                {a.fotos[0]
                  ? <img src={a.fotos[0].url} alt={a.modelo} style={s.img} />
                  : <div style={s.semFoto}>📷</div>
                }
              </div>
              <div style={s.cardInfo}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <h3 style={s.cardTitulo}>{a.marca} {a.modelo} {a.anoMod}</h3>
                  <span style={{ ...s.badge, color: a.ativo ? "#22c55e" : "#888" }}>
                    {a.ativo ? "✅ Ativo" : "⏸️ Pausado"}
                  </span>
                </div>
                <p style={s.preco}>R$ {Number(a.preco).toLocaleString("pt-BR")}</p>
                <p style={s.expira}>
                  Publicado em: {new Date(a.criadoEm).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div style={s.cardAcoes}>
                {a.ativo ? (
                  <button style={s.btnAcao} onClick={() => acao(a.id, "inativar")}>⏸ Pausar</button>
                ) : (
                  <button style={s.btnAcao} onClick={() => acao(a.id, "ativar")}>▶️ Ativar</button>
                )}
                <button style={{ ...s.btnAcao, color: "#ff5555" }}
                  onClick={() => { if (confirm("Excluir este anúncio?")) acao(a.id, "deletar") }}>
                  🗑 Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

const s: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "var(--bg, #0f0f0f)", paddingTop: "40px", paddingBottom: "60px" },
  container: { maxWidth: "800px", margin: "0 auto", padding: "0 20px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" },
  titulo: { fontSize: "1.8rem", fontWeight: 800, color: "#fff", margin: 0 },
  sub: { color: "#666", fontSize: "0.9rem", marginTop: "4px" },
  btnNovo: { background: "var(--accent2, #f5a623)", color: "#000", border: "none", borderRadius: "8px", padding: "10px 18px", fontWeight: 700, cursor: "pointer", textDecoration: "none", fontSize: "0.9rem" },
  btnBloqueado: { background: "#2a2a2a", color: "#666", border: "1px solid #333", borderRadius: "8px", padding: "10px 18px", fontSize: "0.9rem" },
  btnLogout: { background: "transparent", color: "#666", border: "1px solid #333", borderRadius: "8px", padding: "10px 16px", cursor: "pointer", fontSize: "0.9rem" },
  barraWrapper: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" },
  barraFundo: { flex: 1, height: "6px", background: "#222", borderRadius: "99px", overflow: "hidden" },
  barraCheia: { height: "100%", background: "var(--accent2, #f5a623)", borderRadius: "99px", transition: "width 0.4s" },
  barraLabel: { color: "#555", fontSize: "0.8rem", whiteSpace: "nowrap" },
  vazio: { textAlign: "center", color: "#555", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" },
  lista: { display: "flex", flexDirection: "column", gap: "1rem" },
  card: { display: "flex", gap: "1rem", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", overflow: "hidden", flexWrap: "wrap" },
  cardImg: { width: "140px", minHeight: "100px", background: "#111", flexShrink: 0 },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  semFoto: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "#333" },
  cardInfo: { flex: 1, padding: "1rem 0.5rem", minWidth: "160px" },
  cardTitulo: { fontSize: "1rem", fontWeight: 700, color: "#fff", margin: 0 },
  badge: { fontSize: "0.78rem", fontWeight: 600 },
  preco: { color: "var(--accent2, #f5a623)", fontWeight: 700, margin: "6px 0 4px" },
  expira: { color: "#555", fontSize: "0.78rem", margin: 0 },
  cardAcoes: { display: "flex", flexDirection: "column", gap: "6px", padding: "1rem", justifyContent: "center" },
  btnAcao: { background: "transparent", border: "1px solid #333", borderRadius: "6px", color: "#ccc", padding: "6px 12px", cursor: "pointer", fontSize: "0.82rem", textAlign: "left", whiteSpace: "nowrap" },
}
