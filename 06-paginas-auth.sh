#!/bin/bash
# ─── VibeCarros — Script 06: Páginas Login e Registro ────────────────────────
# Execute em: ~/vibecarros/vibecarros
# Comando: bash ~/Downloads/06-paginas-auth.sh

set -e
mkdir -p app/login
mkdir -p app/registro

# ── Login ─────────────────────────────────────────────────────────────────────
cat > app/login/page.tsx << 'EOF'
"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get("redirect") ?? "/painel"

  const [form, setForm] = useState({ email: "", senha: "" })
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setErro("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error); return }
      router.push(redirect)
      router.refresh()
    } catch {
      setErro("Erro de conexão.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={s.main}>
      <div style={s.card}>
        <h1 style={s.titulo}>🚗 VibeCarros</h1>
        <h2 style={s.subtitulo}>Entrar na sua conta</h2>

        <div style={s.campo}>
          <label style={s.label}>E-mail</label>
          <input style={s.input} type="email" placeholder="seu@email.com"
            value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        </div>

        <div style={s.campo}>
          <label style={s.label}>Senha</label>
          <input style={s.input} type="password" placeholder="••••••••"
            value={form.senha} onChange={e => setForm(p => ({ ...p, senha: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>

        {erro && <div style={s.erro}>{erro}</div>}

        <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p style={s.link}>
          Não tem conta?{" "}
          <Link href="/registro" style={{ color: "var(--accent2, #f5a623)" }}>
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </main>
  )
}

const s: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "var(--bg, #0f0f0f)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "var(--card-bg, #1a1a1a)", border: "1px solid #2a2a2a", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "420px" },
  titulo: { textAlign: "center", fontSize: "1.6rem", fontWeight: 800, color: "var(--accent2, #f5a623)", margin: "0 0 0.25rem" },
  subtitulo: { textAlign: "center", color: "#888", fontSize: "1rem", fontWeight: 400, margin: "0 0 2rem" },
  campo: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem" },
  label: { fontSize: "0.82rem", fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.03em" },
  input: { background: "#111", border: "1px solid #333", borderRadius: "8px", color: "#fff", fontSize: "0.95rem", padding: "10px 14px", outline: "none", width: "100%", boxSizing: "border-box" },
  erro: { background: "#2a1111", border: "1px solid #ff5555", borderRadius: "8px", padding: "10px 14px", color: "#ff5555", fontSize: "0.85rem", marginBottom: "1rem" },
  btn: { background: "var(--accent2, #f5a623)", color: "#000", border: "none", borderRadius: "10px", padding: "14px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", width: "100%", marginTop: "0.5rem" },
  link: { textAlign: "center", color: "#666", fontSize: "0.9rem", marginTop: "1.5rem" },
}
EOF

# ── Registro ──────────────────────────────────────────────────────────────────
cat > app/registro/page.tsx << 'EOF'
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const CIDADES = ["Itu", "Salto", "Indaiatuba", "Sorocaba", "Porto Feliz"]

function formatarDocumento(valor: string) {
  const nums = valor.replace(/\D/g, "").slice(0, 14)
  if (nums.length <= 11) {
    if (nums.length <= 3) return nums
    if (nums.length <= 6) return `${nums.slice(0, 3)}.${nums.slice(3)}`
    if (nums.length <= 9) return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}`
    return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6, 9)}-${nums.slice(9)}`
  }
  if (nums.length <= 2) return nums
  if (nums.length <= 5) return `${nums.slice(0, 2)}.${nums.slice(2)}`
  if (nums.length <= 8) return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5)}`
  if (nums.length <= 12) return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5, 8)}/${nums.slice(8)}`
  return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5, 8)}/${nums.slice(8, 12)}-${nums.slice(12)}`
}

function formatarWhatsApp(valor: string) {
  const nums = valor.replace(/\D/g, "").slice(0, 11)
  if (nums.length <= 2) return nums
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`
}

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: "", email: "", senha: "", documento: "",
    whatsapp: "", cidade: "", estado: "SP",
  })
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  const set = (field: string, value: string) =>
    setForm(p => ({ ...p, [field]: value }))

  async function handleSubmit() {
    setErro("")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error); return }
      router.push("/painel")
      router.refresh()
    } catch {
      setErro("Erro de conexão.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={s.main}>
      <div style={s.card}>
        <h1 style={s.titulo}>🚗 VibeCarros</h1>
        <h2 style={s.subtitulo}>Criar conta grátis</h2>

        <div style={s.campo}>
          <label style={s.label}>Nome / Razão Social</label>
          <input style={s.input} placeholder="Seu nome completo" value={form.nome}
            onChange={e => set("nome", e.target.value)} />
        </div>

        <div style={s.campo}>
          <label style={s.label}>E-mail</label>
          <input style={s.input} type="email" placeholder="seu@email.com" value={form.email}
            onChange={e => set("email", e.target.value)} />
        </div>

        <div style={s.campo}>
          <label style={s.label}>Senha</label>
          <input style={s.input} type="password" placeholder="Mínimo 6 caracteres" value={form.senha}
            onChange={e => set("senha", e.target.value)} />
        </div>

        <div style={s.campo}>
          <label style={s.label}>CPF ou CNPJ</label>
          <input style={s.input} placeholder="000.000.000-00 ou 00.000.000/0000-00"
            value={form.documento} onChange={e => set("documento", formatarDocumento(e.target.value))} />
        </div>

        <div style={s.campo}>
          <label style={s.label}>WhatsApp</label>
          <input style={s.input} placeholder="(11) 99999-9999" value={form.whatsapp}
            onChange={e => set("whatsapp", formatarWhatsApp(e.target.value))} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem" }}>
          <div style={s.campo}>
            <label style={s.label}>Cidade</label>
            <select style={s.select} value={form.cidade} onChange={e => set("cidade", e.target.value)}>
              <option value="">Selecione...</option>
              {CIDADES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={s.campo}>
            <label style={s.label}>UF</label>
            <input style={{ ...s.input, width: "60px" }} value={form.estado}
              onChange={e => set("estado", e.target.value.toUpperCase())} maxLength={2} />
          </div>
        </div>

        {erro && <div style={s.erro}>{erro}</div>}

        <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit} disabled={loading}>
          {loading ? "Cadastrando..." : "Criar Conta Grátis"}
        </button>

        <p style={s.link}>
          Já tem conta?{" "}
          <Link href="/login" style={{ color: "var(--accent2, #f5a623)" }}>Entrar</Link>
        </p>
      </div>
    </main>
  )
}

const s: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "var(--bg, #0f0f0f)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "var(--card-bg, #1a1a1a)", border: "1px solid #2a2a2a", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "420px" },
  titulo: { textAlign: "center", fontSize: "1.6rem", fontWeight: 800, color: "var(--accent2, #f5a623)", margin: "0 0 0.25rem" },
  subtitulo: { textAlign: "center", color: "#888", fontSize: "1rem", fontWeight: 400, margin: "0 0 2rem" },
  campo: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem" },
  label: { fontSize: "0.82rem", fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.03em" },
  input: { background: "#111", border: "1px solid #333", borderRadius: "8px", color: "#fff", fontSize: "0.95rem", padding: "10px 14px", outline: "none", width: "100%", boxSizing: "border-box" },
  select: { background: "#111", border: "1px solid #333", borderRadius: "8px", color: "#fff", fontSize: "0.95rem", padding: "10px 14px", outline: "none", width: "100%", boxSizing: "border-box", cursor: "pointer" },
  erro: { background: "#2a1111", border: "1px solid #ff5555", borderRadius: "8px", padding: "10px 14px", color: "#ff5555", fontSize: "0.85rem", marginBottom: "1rem" },
  btn: { background: "var(--accent2, #f5a623)", color: "#000", border: "none", borderRadius: "10px", padding: "14px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", width: "100%", marginTop: "0.5rem" },
  link: { textAlign: "center", color: "#666", fontSize: "0.9rem", marginTop: "1.5rem" },
}
EOF

echo "✅ Páginas criadas: /login e /registro"
echo "👉 Próximo passo: bash 07-painel.sh"
