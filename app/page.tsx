import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import SearchPanel from "./components/SearchPanel"
import Listings from "./components/Listings"
import Footer from "./components/Footer"

export const revalidate = 0

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

async function getTotalAcessos() {
  try {
    const { prisma } = await import("@/lib/prisma")
    return await prisma.acesso.count()
  } catch {
    return 0
  }
}

export default async function Home() {
  const [anuncios, totalAcessos] = await Promise.all([getAnuncios(), getTotalAcessos()])
  return (
    <>
      <Navbar />
      <Hero totalAcessos={totalAcessos} />
      <SearchPanel />
      <Listings anuncios={anuncios} />
      <Footer />
    </>
  )
}
