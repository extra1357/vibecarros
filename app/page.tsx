import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import SearchPanel from "./components/SearchPanel"
import Listings from "./components/Listings"
import Footer from "./components/Footer"

export const revalidate = 0 // sempre busca do banco, sem cache

async function getAnuncios() {
  try {
    const { prisma } = await import("@/lib/prisma")
    const anuncios = await prisma.anuncio.findMany({
      where: { ativo: true },
      include: {
        fotos: { orderBy: { id: "asc" }, take: 1 },
        usuario: { select: { nome: true, whatsapp: true, cidade: true, estado: true } },
      },
      orderBy: [{ destaque: "desc" }, { criadoEm: "desc" }],
    })
    return anuncios
  } catch (error) {
    console.error("Erro ao buscar anuncios:", error)
    return []
  }
}

export default async function Home() {
  const anuncios = await getAnuncios()
  return (
    <>
      <Navbar />
      <Hero />
      <SearchPanel />
      <Listings anuncios={anuncios} />
      <Footer />
    </>
  )
}
