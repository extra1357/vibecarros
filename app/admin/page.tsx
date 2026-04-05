"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Auditoria { id: string; acao: string; detalhe?: string; ip?: string; usuarioId?: string; criadoEm: string }
interface Usuario { id: string; nome: string; email: string; cidade: string; plano: string; criadoEm: string; ativo: boolean }
interface PaginaAcesso { pagina: string; _count: { pagina: number } }

interface DadosAdmin {
  totalUsuarios: number
  totalAnuncios: number
  acessosHoje: number
  ultimasAuditorias: Auditoria[]
  acessosPorPagina: PaginaAcesso[]
  ultimosUsuarios: Usuario[]
}

export default function AdminPage() {
  const router = useRouter()
  const [dados, setDados] = useState<DadosAdmin | null>(null)
  const [aba, setAba] = useState<"resumo" | "auditoria" | "usuarios" | "acessos">("resumo")
  const [erro, setErro] = useState("")

  useEffect(() => {
    fetch("/api/admin", { credentials: "include" })
      .then(r => {
        if (r.status === 401 || r.status === 403) { router.push("/login"); return null }
        return r.json()
      })
      .then(d => { if (d) setDados(d) })
      .catch(() => setErro("Erro ao carregar dados."))
  }, [])

  if (erro) return <div style={{ padding: 40, color: "red" }}>{erro}</div>
  if (!dados) return <div style={{ padding: 40 }}>Carregando painel admin...</div>

  const estiloAba = (a: string) => ({
    padding: "10px 20px", cursor: "pointer", border: "none",
    borderBottom: aba === a ? "3px solid #1E3A5F" : "3px solid transparent",
    background: "none", fontWeight: aba === a ? "bold" : "normal",
    color: aba === a ? "#1E3A5F" : "#666", fontSize: 15
  } as React.CSSProperties)

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1E3A5F", marginBottom: 4 }}>Painel Administrativo</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>VibeCarros — visão geral do sistema</p>

      {/* ABAS */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: 24, display: "flex", gap: 4 }}>
        {(["resumo", "auditoria", "usuarios", "acessos"] as const).map(a => (
          <button key={a} style={estiloAba(a)} onClick={() => setAba(a)}>
            {a === "resumo" ? "Resumo" : a === "auditoria" ? "Auditoria" : a === "usuarios" ? "Usuários" : "Acessos"}
          </button>
        ))}
      </div>

      {/* RESUMO */}
      {aba === "resumo" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Usuários cadastrados", valor: dados.totalUsuarios, cor: "#1E3A5F" },
            { label: "Anúncios no ar", valor: dados.totalAnuncios, cor: "#1A7A4A" },
            { label: "Acessos hoje", valor: dados.acessosHoje, cor: "#C0392B" },
          ].map(card => (
            <div key={card.label} style={{ background: "#f8f9fa", borderRadius: 12, padding: 24, borderLeft: `5px solid ${card.cor}` }}>
              <div style={{ fontSize: 36, fontWeight: "bold", color: card.cor }}>{card.valor}</div>
              <div style={{ color: "#666", marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* AUDITORIA */}
      {aba === "auditoria" && (
        <div>
          <h2 style={{ color: "#1E3A5F", marginBottom: 16 }}>Últimas 50 ações</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1E3A5F", color: "white" }}>
                {["Data/Hora", "Ação", "Detalhe", "IP", "Usuário"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados.ultimasAuditorias.map((a, i) => (
                <tr key={a.id} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={{ padding: "8px 12px" }}>{new Date(a.criadoEm).toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{
                      background: a.acao.includes("FALHOU") ? "#fdecea" : "#d4edda",
                      color: a.acao.includes("FALHOU") ? "#c0392b" : "#1a7a4a",
                      padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: "bold"
                    }}>{a.acao}</span>
                  </td>
                  <td style={{ padding: "8px 12px", color: "#666" }}>{a.detalhe ?? "-"}</td>
                  <td style={{ padding: "8px 12px", color: "#666" }}>{a.ip ?? "-"}</td>
                  <td style={{ padding: "8px 12px", color: "#666" }}>{a.usuarioId ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* USUÁRIOS */}
      {aba === "usuarios" && (
        <div>
          <h2 style={{ color: "#1E3A5F", marginBottom: 16 }}>Últimos 20 usuários</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1E3A5F", color: "white" }}>
                {["Nome", "Email", "Cidade", "Plano", "Ativo", "Cadastrado em"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dados.ultimosUsuarios.map((u, i) => (
                <tr key={u.id} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={{ padding: "8px 12px", fontWeight: "bold" }}>{u.nome}</td>
                  <td style={{ padding: "8px 12px", color: "#666" }}>{u.email}</td>
                  <td style={{ padding: "8px 12px" }}>{u.cidade}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ background: "#d4edda", color: "#1a7a4a", padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>{u.plano}</span>
                  </td>
                  <td style={{ padding: "8px 12px" }}>{u.ativo ? "✅" : "❌"}</td>
                  <td style={{ padding: "8px 12px", color: "#666" }}>{new Date(u.criadoEm).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ACESSOS */}
      {aba === "acessos" && (
        <div>
          <h2 style={{ color: "#1E3A5F", marginBottom: 16 }}>Páginas mais acessadas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {dados.acessosPorPagina.map((a, i) => (
              <div key={a.pagina} style={{ background: "#f8f9fa", borderRadius: 8, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ background: "#1E3A5F", color: "white", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: "bold" }}>{i + 1}</span>
                  <span style={{ fontWeight: "bold" }}>{a.pagina}</span>
                </div>
                <span style={{ background: "#d6e4f0", color: "#1E3A5F", padding: "4px 12px", borderRadius: 20, fontWeight: "bold" }}>{a._count.pagina} acessos</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
