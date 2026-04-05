"use client"
import { useState } from "react"
import CarCard from "./CarCard"

interface Foto { id: string; url: string; ordem: number }
interface Usuario { nome: string; whatsapp: string; cidade?: string; estado?: string }
interface Anuncio {
  id: string; marca: string; modelo: string; versao?: string | null
  anoFab: number; anoMod: number; km: number; combustivel: string
  cambio: string; preco: number; fipe?: number | null
  destaque: boolean; fotos: Foto[]; usuario: Usuario
}

export default function Listings({ anuncios }: { anuncios: Anuncio[] }) {
  const [filtro, setFiltro] = useState("")

  const filtrados = anuncios.filter(a =>
    `${a.marca} ${a.modelo} ${a.versao ?? ""}`.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div>
      <input
        placeholder="Buscar marca ou modelo..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={{
          width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
          border: "1px solid #2a2a2a", background: "#1a1a1a", color: "#fff",
          fontSize: "1rem", marginBottom: "1.5rem", boxSizing: "border-box"
        }}
      />
      {filtrados.length === 0 && (
        <p style={{ color: "#555", textAlign: "center", padding: "3rem 0" }}>
          Nenhum anuncio encontrado.
        </p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {filtrados.map(a => <CarCard key={a.id} anuncio={a} />)}
      </div>
    </div>
  )
}
