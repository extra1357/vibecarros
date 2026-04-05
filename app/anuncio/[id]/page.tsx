import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

export default async function AnuncioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const anuncio = await prisma.anuncio.findUnique({
    where: { id },
    include: {
      fotos: { orderBy: { id: "asc" } },
      usuario: { select: { nome: true, whatsapp: true, cidade: true, estado: true } },
    },
  })
  if (!anuncio) notFound()

  const titulo = `${anuncio.marca} ${anuncio.modelo}${anuncio.versao ? " " + anuncio.versao : ""} ${anuncio.anoMod}`
  const whatsapp = anuncio.usuario.whatsapp.replace(/\D/g, "")
  const msg = encodeURIComponent(`Olá! Tenho interesse no ${titulo} anunciado no VibeCarros.`)
  const waUrl = `https://wa.me/55${whatsapp}?text=${msg}`

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#0f0f0f", padding: "2rem 1rem 4rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Link href="/" style={{ color: "#888", fontSize: "0.9rem", textDecoration: "none" }}>← Voltar</Link>

          {/* Carrossel */}
          <div style={{ margin: "1.5rem 0", borderRadius: "12px", overflow: "hidden", background: "#111" }}>
            {anuncio.fotos.length === 0 ? (
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#333", fontSize: "3rem" }}>📷</div>
            ) : (
              <div style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", gap: "8px", padding: "8px", scrollbarWidth: "none" }}>
                {anuncio.fotos.map((f: { id: string; url: string }, i: number) => (
                  <img key={f.id} src={f.url} alt={`Foto ${i + 1}`}
                    style={{ minWidth: "100%", maxHeight: "420px", objectFit: "cover", scrollSnapAlign: "start", borderRadius: "8px" }} />
                ))}
              </div>
            )}
          </div>

          {/* Título e preço */}
          <h1 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, margin: "0 0 0.25rem" }}>{titulo}</h1>
          <p style={{ color: "#888", margin: "0 0 1rem" }}>{anuncio.usuario.cidade} - {anuncio.usuario.estado}</p>

          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <span style={{ color: "#f5a623", fontSize: "2rem", fontWeight: 800 }}>
              R$ {Number(anuncio.preco).toLocaleString("pt-BR")}
            </span>
            {anuncio.fipe && (
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                FIPE: R$ {Number(anuncio.fipe).toLocaleString("pt-BR")}
              </span>
            )}
          </div>

          {/* Specs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem", marginBottom: "2rem" }}>
            {([
              ["Ano Fab.", anuncio.anoFab],
              ["Ano Mod.", anuncio.anoMod],
              ["KM", `${Number(anuncio.km).toLocaleString("pt-BR")} km`],
              ["Combustível", anuncio.combustivel],
              ["Câmbio", anuncio.cambio],
              ["Cor", anuncio.cor],
              anuncio.portas ? ["Portas", anuncio.portas] : null,
              ["Blindado", anuncio.blindado ? "Sim" : "Não"],
              ["Financiamento", anuncio.financiamento ? "Aceita" : "Não aceita"],
              ["Troca", anuncio.troca ? "Aceita" : "Não aceita"],
            ] as ([string, string | number] | null)[]).filter((x): x is [string, string | number] => x !== null).map(([label, valor]) => (
              <div key={label} style={{ background: "#1a1a1a", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                <div style={{ color: "#666", fontSize: "0.75rem", marginBottom: "4px" }}>{label}</div>
                <div style={{ color: "#fff", fontWeight: 600 }}>{valor}</div>
              </div>
            ))}
          </div>

          {/* Descrição */}
          {anuncio.descricao && (
            <div style={{ background: "#1a1a1a", borderRadius: "8px", padding: "1.25rem", marginBottom: "2rem" }}>
              <h3 style={{ color: "#fff", margin: "0 0 0.75rem", fontSize: "1rem" }}>Descrição</h3>
              <p style={{ color: "#aaa", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>{anuncio.descricao}</p>
            </div>
          )}

          {/* Contato */}
          <div style={{ background: "#1a1a1a", borderRadius: "12px", padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 700 }}>{anuncio.usuario.nome}</div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>{anuncio.usuario.cidade} - {anuncio.usuario.estado}</div>
            </div>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#fff", padding: "0.875rem 1.75rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>
              💬 Chamar no WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
