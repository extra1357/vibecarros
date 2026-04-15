"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"

type Aba = "resumo" | "auditoria" | "usuarios" | "acessos" | "anuncios"
interface Foto { id: string; url: string; ordem: number }
interface Anuncio { id: string; marca: string; modelo: string; anoMod: number; preco: number; ativo: boolean; destaque: boolean; criadoEm: string; fotos: Foto[]; usuario: { nome: string; email: string; cidade: string; whatsapp: string } }
interface Usuario { id: string; nome: string; email: string; cidade: string; estado: string; plano: string; ativo: boolean; criadoEm: string; whatsapp: string; tipDoc: string }
interface Auditoria { id: string; acao: string; detalhe?: string; ip?: string; usuarioId?: string; criadoEm: string }
interface PaginaAcesso { pagina: string; _count: { pagina: number } }
interface DadosResumo { totalUsuarios: number; totalAnuncios: number; acessosHoje: number; ultimasAuditorias: Auditoria[]; acessosPorPagina: PaginaAcesso[]; ultimosUsuarios: Usuario[] }

export default function AdminPage() {
  const router = useRouter()
  const [aba, setAba] = useState<Aba>("resumo")
  const [resumo, setResumo] = useState<DadosResumo | null>(null)
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState("")
  const [fotoExpandida, setFotoExpandida] = useState<string | null>(null)
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  async function carregar(a: Aba) {
    setLoading(true)
    const res = await fetch(`/api/admin?aba=${a}`, { credentials: "include" })
    if (res.status === 401 || res.status === 403) { router.push("/login"); return }
    const d = await res.json()
    if (a === "resumo" || a === "auditoria" || a === "acessos") setResumo(d)
    if (a === "anuncios") setAnuncios(d.anuncios)
    if (a === "usuarios") setUsuarios(d.usuarios)
    setLoading(false)
  }

  useEffect(() => { carregar(aba) }, [aba])

  async function acao(tipo: string, id: string, ac: string, valor?: unknown) {
    setMsg("")
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ tipo, id, acao: ac, valor }),
    })
    if (res.ok) { setMsg("✅ Ação realizada!"); carregar(aba) }
    else setMsg("❌ Erro ao executar ação.")
    setTimeout(() => setMsg(""), 3000)
  }

  async function adicionarFotos(anuncioId: string, files: FileList) {
    setUploadingId(anuncioId)
    setMsg("")
    const form = new FormData()
    Array.from(files).forEach(f => form.append("fotos", f))
    const res = await fetch(`/api/anuncios/${anuncioId}/fotos`, { method: "POST", body: form, credentials: "include" })
    if (res.ok) { setMsg("✅ Fotos adicionadas!"); carregar(aba) }
    else { const d = await res.json(); setMsg(`❌ ${d.error ?? "Erro ao adicionar fotos."}`) }
    setUploadingId(null)
    setTimeout(() => setMsg(""), 4000)
  }

  const estiloAba = (a: Aba) => ({
    padding: "10px 18px", cursor: "pointer", border: "none",
    borderBottom: aba === a ? "3px solid #1E3A5F" : "3px solid transparent",
    background: "none", fontWeight: aba === a ? "bold" : "normal",
    color: aba === a ? "#1E3A5F" : "#666", fontSize: 14,
  } as React.CSSProperties)

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1E3A5F", marginBottom: 4 }}>Painel Administrativo</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>VibeCarros — controle total</p>

      {msg && <div style={{ padding: "10px 16px", borderRadius: 8, marginBottom: 16, background: msg.includes("✅") ? "#d4edda" : "#fdecea", color: msg.includes("✅") ? "#1a7a4a" : "#c0392b" }}>{msg}</div>}

      {fotoExpandida && (
        <div onClick={() => setFotoExpandida(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <img src={fotoExpandida} style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8 }} />
        </div>
      )}

      <div style={{ borderBottom: "1px solid #ddd", marginBottom: 24, display: "flex", gap: 4, flexWrap: "wrap" }}>
        {(["resumo", "anuncios", "usuarios", "auditoria", "acessos"] as Aba[]).map(a => (
          <button key={a} style={estiloAba(a)} onClick={() => setAba(a)}>
            {a === "resumo" ? "📊 Resumo" : a === "anuncios" ? "🚗 Anúncios" : a === "usuarios" ? "👥 Usuários" : a === "auditoria" ? "📋 Auditoria" : "📈 Acessos"}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: "#888" }}>Carregando...</p>}

      {/* RESUMO */}
      {!loading && aba === "resumo" && resumo && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Usuários cadastrados", valor: resumo.totalUsuarios, cor: "#1E3A5F" },
            { label: "Anúncios no ar", valor: resumo.totalAnuncios, cor: "#1A7A4A" },
            { label: "Acessos hoje", valor: resumo.acessosHoje, cor: "#C0392B" },
          ].map(card => (
            <div key={card.label} style={{ background: "#f8f9fa", borderRadius: 12, padding: 24, borderLeft: `5px solid ${card.cor}` }}>
              <div style={{ fontSize: 36, fontWeight: "bold", color: card.cor }}>{card.valor}</div>
              <div style={{ color: "#666", marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ANÚNCIOS */}
      {!loading && aba === "anuncios" && (
        <div>
          <h2 style={{ color: "#1E3A5F", marginBottom: 16 }}>Todos os Anúncios ({anuncios.length})</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {anuncios.map(a => (
              <div key={a.id} style={{ background: "#f8f9fa", borderRadius: 12, padding: 16, border: "1px solid #e0e0e0" }}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>

                  {/* FOTOS */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                    {a.fotos.map(f => (
                      <div key={f.id} style={{ position: "relative" }}>
                        <img src={f.url} onClick={() => setFotoExpandida(f.url)}
                          style={{ width: 90, height: 70, objectFit: "cover", borderRadius: 6, cursor: "pointer", border: "1px solid #ddd" }} />
                        <button onClick={() => { if (confirm("Remover esta foto?")) acao("anuncio", a.id, "deletarFoto", f.id) }}
                          style={{ position: "absolute", top: 2, right: 2, background: "rgba(200,0,0,0.8)", border: "none", color: "#fff", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 11, fontWeight: "bold" }}>✕</button>
                      </div>
                    ))}

                    {/* BOTÃO ADICIONAR FOTO */}
                    <div onClick={() => inputRefs.current[a.id]?.click()}
                      style={{ width: 90, height: 70, border: "2px dashed #bbb", borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: uploadingId === a.id ? "wait" : "pointer", background: "#fff", gap: 2 }}>
                      {uploadingId === a.id
                        ? <span style={{ fontSize: 11, color: "#888" }}>Enviando...</span>
                        : <><span style={{ fontSize: 22, color: "#aaa" }}>+</span><span style={{ fontSize: 10, color: "#aaa" }}>add foto</span></>
                      }
                      <input ref={el => { inputRefs.current[a.id] = el }} type="file" accept="image/*" multiple style={{ display: "none" }}
                        onChange={e => e.target.files && adicionarFotos(a.id, e.target.files)} />
                    </div>
                  </div>

                  {/* INFO */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontWeight: "bold", fontSize: 15 }}>{a.marca} {a.modelo} {a.anoMod}</div>
                    <div style={{ color: "#1A7A4A", fontWeight: "bold" }}>R$ {Number(a.preco).toLocaleString("pt-BR")}</div>
                    <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>👤 {a.usuario.nome} · {a.usuario.email}</div>
                    <div style={{ color: "#666", fontSize: 13 }}>📍 {a.usuario.cidade} · 📱 {a.usuario.whatsapp}</div>
                    <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
                      {new Date(a.criadoEm).toLocaleDateString("pt-BR")} ·
                      <span style={{ marginLeft: 6, color: a.ativo ? "#1a7a4a" : "#c0392b", fontWeight: "bold" }}>{a.ativo ? "✅ Ativo" : "❌ Inativo"}</span>
                      {a.destaque && <span style={{ marginLeft: 6, color: "#f5a623", fontWeight: "bold" }}>⭐ Destaque</span>}
                    </div>
                  </div>

                  {/* AÇÕES */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 130 }}>
                    {a.ativo
                      ? <button style={btn("#c0392b")} onClick={() => acao("anuncio", a.id, "inativar")}>⏸ Suspender</button>
                      : <button style={btn("#1a7a4a")} onClick={() => acao("anuncio", a.id, "ativar")}>▶️ Reativar</button>
                    }
                    {a.destaque
                      ? <button style={btn("#888")} onClick={() => acao("anuncio", a.id, "destaque", false)}>★ Remover destaque</button>
                      : <button style={btn("#f5a623")} onClick={() => acao("anuncio", a.id, "destaque", true)}>⭐ Destacar</button>
                    }
                    <button style={btn("#f59e0b")} onClick={() => { if (confirm("Marcar como VENDIDO? Ficará visível por 7 dias.")) acao("anuncio", a.id, "vendido") }}>🏷️ Vendido</button>
                    <button style={btn("#c0392b")} onClick={() => { if (confirm("Deletar anúncio permanentemente?")) acao("anuncio", a.id, "deletar") }}>🗑 Deletar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USUÁRIOS */}
      {!loading && aba === "usuarios" && (
        <div>
          <h2 style={{ color: "#1E3A5F", marginBottom: 16 }}>Usuários ({usuarios.length})</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1E3A5F", color: "white" }}>
                {["Nome", "Email", "Cidade", "Tipo", "Plano", "Status", "Ações"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={u.id} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={{ padding: "8px 12px", fontWeight: "bold" }}>{u.nome}</td>
                  <td style={{ padding: "8px 12px", color: "#666" }}>{u.email}</td>
                  <td style={{ padding: "8px 12px" }}>{u.cidade}/{u.estado}</td>
                  <td style={{ padding: "8px 12px" }}>{u.tipDoc}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <select defaultValue={u.plano} onChange={e => acao("usuario", u.id, "plano", e.target.value)}
                      style={{ border: "1px solid #ddd", borderRadius: 4, padding: "2px 6px", fontSize: 12 }}>
                      {["free", "pf_plus", "pf_pro", "pj_starter", "pj_pro", "pj_premium"].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ color: u.ativo ? "#1a7a4a" : "#c0392b", fontWeight: "bold" }}>{u.ativo ? "✅ Ativo" : "❌ Suspenso"}</span>
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    {u.ativo
                      ? <button style={btn("#c0392b")} onClick={() => { if (confirm(`Suspender ${u.nome}?`)) acao("usuario", u.id, "suspender") }}>Suspender</button>
                      : <button style={btn("#1a7a4a")} onClick={() => acao("usuario", u.id, "ativar")}>Reativar</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AUDITORIA */}
      {!loading && aba === "auditoria" && resumo && (
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
              {resumo.ultimasAuditorias.map((a, i) => (
                <tr key={a.id} style={{ background: i % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={{ padding: "8px 12px" }}>{new Date(a.criadoEm).toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <span style={{ background: a.acao.includes("FALHOU") ? "#fdecea" : "#d4edda", color: a.acao.includes("FALHOU") ? "#c0392b" : "#1a7a4a", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: "bold" }}>{a.acao}</span>
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

      {/* ACESSOS */}
      {!loading && aba === "acessos" && resumo && (
        <div>
          <h2 style={{ color: "#1E3A5F", marginBottom: 16 }}>Páginas mais acessadas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {resumo.acessosPorPagina.map((a, i) => (
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

function btn(cor: string): React.CSSProperties {
  return { background: cor, border: "none", color: "#fff", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: "bold", whiteSpace: "nowrap" }
}
