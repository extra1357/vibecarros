"use client"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function LoginForm() {
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
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error || "Erro ao entrar."); return }
      router.push(redirect)
      router.refresh()
    } catch {
      setErro("Erro de conexao. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={s.main}>
      <div style={s.card}>
        <h1 style={s.titulo}>Entrar</h1>
        <p style={s.sub}>Acesse sua conta VibeCarros</p>
        {erro && <div style={s.erro}>{erro}</div>}
        <input style={s.input} type="email" placeholder="Email"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input style={s.input} type="password" placeholder="Senha"
          value={form.senha} onChange={e => setForm(f => ({ ...f, senha: e.target.value }))}
          onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p style={s.link}>
          Nao tem conta?{" "}
          <Link href="/registro" style={{ color: "#f5a623" }}>Criar conta gratis</Link>
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: "100vh", background: "#0f0f0f" }} />}>
      <LoginForm />
    </Suspense>
  )
}

const s: Record<string, React.CSSProperties> = {
  main: { minHeight: "100vh", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" },
  card: { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "16px", padding: "2.5rem 2rem", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" },
  titulo: { color: "#fff", fontSize: "1.8rem", fontWeight: 800, margin: 0, textAlign: "center" },
  sub: { color: "#666", margin: 0, textAlign: "center", fontSize: "0.9rem" },
  erro: { background: "#2a1a1a", border: "1px solid #ff5555", borderRadius: "8px", padding: "0.75rem", color: "#ff5555", fontSize: "0.9rem" },
  input: { background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "0.875rem 1rem", color: "#fff", fontSize: "1rem", outline: "none" },
  btn: { background: "#f5a623", color: "#000", border: "none", borderRadius: "8px", padding: "0.875rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem" },
  link: { color: "#666", fontSize: "0.85rem", textAlign: "center", margin: 0 },
}
