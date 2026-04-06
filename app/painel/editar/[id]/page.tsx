"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"

interface Foto { id: string; url: string }

export default function EditarFotosPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [fotos, setFotos] = useState<Foto[]>([])
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [msg, setMsg] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function carregar() {
    const res = await fetch(`/api/anuncios/${id}`)
    if (!res.ok) { router.push("/painel"); return }
    const data = await res.json()
    setFotos(data.fotos ?? [])
    setLoading(false)
  }

  useEffect(() => { carregar() }, [id])

  async function removerFoto(fotoId: string) {
    if (!confirm("Remover esta foto?")) return
    setSalvando(true)
    const res = await fetch(`/api/anuncios/${id}/fotos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fotoId }),
    })
    if (res.ok) { setMsg("Foto removida!"); await carregar() }
    else setMsg("Erro ao remover foto.")
    setSalvando(false)
  }

  async function adicionarFotos(files: FileList) {
    setSalvando(true)
    setMsg("")
    const form = new FormData()
    Array.from(files).forEach(f => form.append("fotos", f))
    const res = await fetch(`/api/anuncios/${id}/fotos`, { method: "POST", body: form })
    if (res.ok) { setMsg("Fotos adicionadas!"); await carregar() }
    else { const d = await res.json(); setMsg(d.error ?? "Erro ao adicionar fotos.") }
    setSalvando(false)
  }

  if (loading) return <main style={s.main}><p style={{ color: "#888", textAlign: "center" }}>Carregando...</p></main>

  return (
    <main style={s.main}>
      <div style={s.container}>
        <button onClick={() => router.push("/painel")} style={s.btnVoltar}>← Voltar ao painel</button>
        <h1 style={s.titulo}>Editar Fotos do Anúncio</h1>

        {msg && <div style={{ ...s.msg, background: msg.includes("Erro") ? "#3a1a1a" : "#1a3a1a", color: msg.includes("Erro") ? "#ff5555" : "#22c55e" }}>{msg}</div>}

        <div style={s.grid}>
          {fotos.map(f => (
            <div key={f.id} style={s.fotoCard}>
              <img src={f.url} alt="foto" style={s.img} />
              <button style={s.btnRemover} onClick={() => removerFoto(f.id)} disabled={salvando}>✕</button>
            </div>
          ))}

          <div style={s.addCard} onClick={() => inputRef.current?.click()}>
            <span style={{ fontSize: 32, color: "#444" }}>+</span>
            <span style={{ color: "#555", fontSize: 13 }}>Adicionar fotos</span>
            <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }}
              onChange={e => e.target.files && adicionarFotos(e.target.files)} />
          </div>
        </div>

        <p style={{ color: "#555", fontSize: 13, marginTop: 16 }}>{fotos.length} foto(s) · máx. 2MB por foto</p>
      </div>
    </main>
  )
}

const s: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "#0f0f0f", paddingTop: 40, paddingBottom: 60 },
  container: { maxWidth: 800, margin: "0 auto", padding: "0 20px" },
  btnVoltar: { background: "transparent", border: "none", color: "#666", cursor: "pointer", fontSize: 14, marginBottom: 20, padding: 0 },
  titulo: { fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: 24 },
  msg: { padding: "10px 16px", borderRadius: 8, marginBottom: 20, fontSize: 14 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 },
  fotoCard: { position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "4/3", background: "#1a1a1a" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  btnRemover: { position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 14, fontWeight: "bold" },
  addCard: { borderRadius: 10, border: "2px dashed #333", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 8, background: "#111" },
}
