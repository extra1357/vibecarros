import { MetadataRoute } from "next"

const CIDADES = ["itu", "salto", "indaiatuba", "sorocaba", "porto-feliz"]
const BASE = "https://www.vibecarros.com.br"

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  const estaticas = [
    { url: BASE, lastModified: agora, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE}/planos`, lastModified: agora, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/anunciar`, lastModified: agora, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: agora, changeFrequency: "weekly" as const, priority: 0.9 },
  ]

  const blogs = CIDADES.map((cidade) => ({
    url: `${BASE}/blog/${cidade}`,
    lastModified: agora,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  return [...estaticas, ...blogs]
}
