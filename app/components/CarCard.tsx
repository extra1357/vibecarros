"use client"
import { useRouter } from "next/navigation"

interface Foto { id: string; url: string; ordem: number }
interface Usuario { nome: string; whatsapp: string; cidade?: string; estado?: string }
interface Anuncio {
  id: string; marca: string; modelo: string; versao?: string | null
  anoFab: number; anoMod: number; km: number; combustivel: string
  cambio: string; preco: number; fipe?: number | null
  destaque: boolean; fotos: Foto[]; usuario?: Usuario
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 })
}

export default function CarCard({ anuncio }: { anuncio: Anuncio }) {
  const router = useRouter()
  const titulo = `${anuncio.marca} ${anuncio.modelo}${anuncio.versao ? " " + anuncio.versao : ""}`
  const capa = anuncio.fotos?.[0]
  const whatsapp = anuncio.usuario?.whatsapp?.replace(/\D/g, "") ?? ""
  const msg = encodeURIComponent(`Ola! Tenho interesse no ${titulo} ${anuncio.anoMod} anunciado no VibeCarros.`)
  const waUrl = `https://wa.me/55${whatsapp}?text=${msg}`

  return (
    <div className="car-card" onClick={() => router.push(`/anuncio/${anuncio.id}`)}
      style={{ cursor: "pointer" }}>
      <div className="card-img-wrap">
        {capa
          ? <img src={capa.url} alt={titulo} loading="lazy" />
          : <div style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", color: "#333" }}>📷</div>
        }
        {anuncio.destaque && <div className="card-badge destaque">Destaque</div>}
      </div>
      <div className="card-body">
        <div className="card-title">{titulo}</div>
        <div className="card-sub">{anuncio.anoFab}/{anuncio.anoMod} · {anuncio.km.toLocaleString("pt-BR")} km</div>
        <div className="card-specs">
          <span className="card-spec">{anuncio.combustivel}</span>
          <span className="card-spec">{anuncio.cambio}</span>
        </div>
        <div className="card-prices">
          <div className="price-ask">
            <label>Preco</label>
            <strong>{formatBRL(anuncio.preco)}</strong>
          </div>
          {anuncio.fipe && (
            <div className="price-fipe">
              <label>FIPE</label>
              <strong>{formatBRL(anuncio.fipe)}</strong>
            </div>
          )}
        </div>
        <div className="card-footer">
          {whatsapp && (
            <a className="btn-whatsapp" href={waUrl} target="_blank"
              onClick={e => e.stopPropagation()}
              rel="noopener noreferrer">WhatsApp</a>
          )}
          <button className="btn-detail"
            onClick={e => { e.stopPropagation(); router.push(`/anuncio/${anuncio.id}`) }}>
            Ver +
          </button>
        </div>
      </div>
    </div>
  )
}
