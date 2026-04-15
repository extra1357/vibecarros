import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import type { Metadata } from "next"
import VeiculoCard from "./VeiculoCard"

// ─── Dados editoriais por cidade ───────────────────────────────────────────
const CIDADES: Record<string, {
  nome: string
  estado: string
  slug: string
  descricao: string
  populacao: string
  destaque: string
}> = {
  itu: {
    nome: "Itu", estado: "SP", slug: "itu",
    descricao: "Itu é uma das cidades mais tradicionais do interior paulista, conhecida pelo Museu Republicano e pela cultura das coisas gigantes. O mercado de veículos usados em Itu é movimentado e conta com compradores exigentes.",
    populacao: "170 mil habitantes",
    destaque: "Cidade histórica a 100 km de São Paulo, com forte mercado de veículos seminovos."
  },
  salto: {
    nome: "Salto", estado: "SP", slug: "salto",
    descricao: "Salto se destaca pelo turismo das Sete Quedas e pela proximidade com Itu e Indaiatuba. A cidade tem perfil de compradores práticos que buscam veículos confiáveis para o dia a dia.",
    populacao: "130 mil habitantes",
    destaque: "Cidade às margens do Rio Tietê, com mercado de usados aquecido na região."
  },
  indaiatuba: {
    nome: "Indaiatuba", estado: "SP", slug: "indaiatuba",
    descricao: "Indaiatuba é uma das cidades com melhor qualidade de vida do estado de São Paulo. Com um parque industrial relevante, a demanda por veículos é constante e o mercado de usados é sólido.",
    populacao: "280 mil habitantes",
    destaque: "Uma das cidades mais desenvolvidas do interior paulista, com mercado automobilístico ativo."
  },
  sorocaba: {
    nome: "Sorocaba", estado: "SP", slug: "sorocaba",
    descricao: "Sorocaba é o maior polo industrial da região, com população expressiva e um dos mercados de veículos usados mais movimentados do interior paulista.",
    populacao: "700 mil habitantes",
    destaque: "Maior cidade da região, com enorme oferta e procura por veículos de todos os segmentos."
  },
  "porto-feliz": {
    nome: "Porto Feliz", estado: "SP", slug: "porto-feliz",
    descricao: "Porto Feliz é conhecida pela Descida dos Marinheiros e pela proximidade com o Rio Tietê. Cidade tranquila onde compradores buscam veículos para uso rural e urbano.",
    populacao: "55 mil habitantes",
    destaque: "Cidade histórica com mercado de pickup e utilitários muito ativo."
  },
}

// ─── SSG: gera as páginas em build ─────────────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(CIDADES).map((cidade) => ({ cidade }))
}

// ─── Metadata dinâmica por cidade ──────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ cidade: string }> }
): Promise<Metadata> {
  const { cidade } = await params
  const c = CIDADES[cidade]
  if (!c) return {}
  return {
    title: `Comprar e Vender Carros em ${c.nome} SP | VibeCarros`,
    description: `Encontre veículos à venda em ${c.nome} SP com comparação FIPE automática. Dicas de segurança para compra de carros usados, como evitar golpes e o que verificar antes de fechar negócio.`,
    keywords: `carros usados ${c.nome}, veículos ${c.nome} SP, comprar carro ${c.nome}, vender carro ${c.nome}, seminovos ${c.nome}`,
    alternates: { canonical: `https://www.vibecarros.com.br/blog/${cidade}` },
    openGraph: {
      title: `Carros à Venda em ${c.nome} SP | VibeCarros`,
      description: `Veículos verificados com tabela FIPE em ${c.nome} e região. Compre com segurança.`,
      url: `https://www.vibecarros.com.br/blog/${cidade}`,
      siteName: "VibeCarros",
      locale: "pt_BR",
      type: "article",
    },
    robots: { index: true, follow: true },
  }
}

// ─── Busca veículos da cidade ───────────────────────────────────────────────
async function getVeiculos(nomeCidade: string) {
  try {
    return await prisma.anuncio.findMany({
      where: {
        OR: [{ ativo: true }, { vendidoEm: { gte: new Date(Date.now() - 7*24*60*60*1000) } }],
        usuario: { cidade: { equals: nomeCidade, mode: "insensitive" } },
      },
      include: {
        fotos: { orderBy: { id: "asc" }, take: 1 },
        vendidoEm: true,
        usuario: { select: { nome: true, whatsapp: true, cidade: true } },
      },
      orderBy: [{ destaque: "desc" }, { criadoEm: "desc" }],
      take: 12,
    })
  } catch {
    return []
  }
}

// ─── Componente ────────────────────────────────────────────────────────────
export default async function BlogCidade(
  { params }: { params: Promise<{ cidade: string }> }
) {
  const { cidade } = await params
  const c = CIDADES[cidade]
  if (!c) notFound()

  const veiculos = await getVeiculos(c.nome)

  // JSON-LD: BlogPosting + ItemList (Rich Results)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://www.vibecarros.com.br/blog/${cidade}#article`,
        "headline": `Guia de Compra de Veículos Usados em ${c.nome} SP`,
        "description": `Tudo que você precisa saber para comprar um carro usado em ${c.nome} com segurança: vistoria mecânica, elétrica, documentação e como evitar golpes.`,
        "author": { "@type": "Organization", "name": "VibeCarros", "url": "https://www.vibecarros.com.br" },
        "publisher": {
          "@type": "Organization",
          "name": "VibeCarros",
          "url": "https://www.vibecarros.com.br",
          "logo": { "@type": "ImageObject", "url": "https://www.vibecarros.com.br/logo.png" }
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split("T")[0],
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.vibecarros.com.br/blog/${cidade}` },
        "inLanguage": "pt-BR",
        "about": { "@type": "Place", "name": c.nome, "addressRegion": "SP", "addressCountry": "BR" },
      },
      {
        "@type": "ItemList",
        "name": `Veículos à venda em ${c.nome}`,
        "numberOfItems": veiculos.length,
        "itemListElement": veiculos.slice(0, 6).map((v, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `https://www.vibecarros.com.br/anuncio/${v.id}`,
          "name": `${v.marca} ${v.modelo} ${v.anoMod} — R$ ${Number(v.preco).toLocaleString("pt-BR")}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://www.vibecarros.com.br" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.vibecarros.com.br/blog" },
          { "@type": "ListItem", "position": 3, "name": c.nome, "item": `https://www.vibecarros.com.br/blog/${cidade}` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ fontFamily: "system-ui,sans-serif", color: "#1a1a1a", maxWidth: 860, margin: "0 auto", padding: "0 16px 48px" }}>

        {/* BREADCRUMB */}
        <nav aria-label="Navegação estrutural" style={{ fontSize: 13, color: "#666", padding: "16px 0 8px", borderBottom: "1px solid #eee", marginBottom: 24 }}>
          <Link href="/" style={{ color: "#1E3A5F", textDecoration: "none" }}>Início</Link>
          <span style={{ margin: "0 6px" }}>›</span>
          <Link href="/blog" style={{ color: "#1E3A5F", textDecoration: "none" }}>Blog</Link>
          <span style={{ margin: "0 6px" }}>›</span>
          <span>{c.nome}</span>
        </nav>

        {/* HEADER */}
        <header style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: "#1E3A5F", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            📍 {c.nome}, {c.estado} · {c.populacao}
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 12px", color: "#1E3A5F" }}>
            Comprar Carro Usado em {c.nome}: O Guia Completo para Não Cair em Golpe
          </h1>
          <p style={{ fontSize: 17, color: "#444", lineHeight: 1.7, margin: 0 }}>
            {c.descricao} Neste guia você vai aprender o que verificar antes de fechar qualquer negócio — mecânica, elétrica, documentação — e como se proteger dos golpes mais comuns no mercado de usados.
          </p>
        </header>

        {/* VEÍCULOS DA CIDADE */}
        {veiculos.length > 0 && (
          <section aria-labelledby="anuncios-heading" style={{ marginBottom: 48 }}>
            <h2 id="anuncios-heading" style={{ fontSize: 20, fontWeight: 700, color: "#1E3A5F", marginBottom: 16, borderLeft: "4px solid #1E3A5F", paddingLeft: 12 }}>
              🚗 Veículos à Venda em {c.nome} agora
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
              {veiculos.map((v) => (
                <VeiculoCard
                  key={v.id}
                  id={v.id}
                  marca={v.marca}
                  modelo={v.modelo}
                  anoFab={v.anoFab}
                  anoMod={v.anoMod}
                  km={v.km}
                  preco={Number(v.preco)}
                  fotoUrl={v.fotos[0]?.url ?? null}
                  nomeCidade={c.nome}
                  vendidoEm={v.vendidoEm ?? null}
                />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Link href={`/?cidade=${c.nome}`} style={{ display: "inline-block", background: "#1E3A5F", color: "#fff", padding: "10px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
                Ver todos os veículos em {c.nome}
              </Link>
            </div>
          </section>
        )}

        {veiculos.length === 0 && (
          <section style={{ background: "#f0f4f8", borderRadius: 10, padding: 24, marginBottom: 40, textAlign: "center" }}>
            <p style={{ color: "#666", margin: 0 }}>Ainda não há veículos cadastrados em {c.nome}. <Link href="/anunciar" style={{ color: "#1E3A5F", fontWeight: 700 }}>Seja o primeiro a anunciar!</Link></p>
          </section>
        )}

        {/* CONTEÚDO EDITORIAL */}
        <div style={{ lineHeight: 1.8, fontSize: 16 }}>

          <section aria-labelledby="mecanica-heading" style={{ marginBottom: 40 }}>
            <h2 id="mecanica-heading" style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", marginBottom: 12 }}>
              🔧 O que verificar na mecânica antes de comprar
            </h2>
            <p>A mecânica é o coração do veículo. Um carro bonito por fora pode esconder problemas sérios que só aparecem depois da compra. Antes de qualquer negociação, faça uma vistoria mecânica em uma oficina de sua confiança — nunca na oficina indicada pelo vendedor.</p>
            <p>Verifique o motor em temperatura fria: um bom motor parte facilmente e não emite fumaça azul ou preta no escapamento. Fumaça azul indica queima de óleo (desgaste interno), fumaça preta indica mistura rica de combustível (problema de injeção). Verifique o nível e a cor do óleo do motor: óleo preto é normal, mas óleo com aparência leitosa indica mistura com água, sinal grave de junta do cabeçote estourada.</p>
            <p>Avalie a caixa de câmbio: no automático, observe se as trocas são suaves. No manual, verifique se a embreagem "pega" muito alta no pedal — embreagem no fim da vida. Teste os freios em velocidade: o carro deve frear em linha reta sem puxar para os lados. Barulhos ao frear indicam pastilhas gastas ou discos empenados.</p>
            <div style={{ background: "#fff8e1", border: "1px solid #f5a623", borderRadius: 8, padding: 16, marginTop: 16 }}>
              <strong>⚠️ Atenção:</strong> Sempre peça para rodar o carro por pelo menos 15 minutos em condições reais de trânsito. Muitos problemas mecânicos só aparecem com o motor quente.
            </div>
          </section>

          <section aria-labelledby="eletrica-heading" style={{ marginBottom: 40 }}>
            <h2 id="eletrica-heading" style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", marginBottom: 12 }}>
              ⚡ Elétrica: onde mora o prejuízo silencioso
            </h2>
            <p>Problemas elétricos são traiçoeiros porque o custo de reparo pode superar o valor do próprio veículo. Teste todos os componentes elétricos: vidros elétricos, travas, espelhos, ar-condicionado, faróis, luzes internas, sensor de ré, central multimídia e sensores do painel.</p>
            <p>Verifique se alguma luz de alerta permanece acesa no painel após ligar o carro. Luzes como "Check Engine", ABS, airbag ou TPMS acesas indicam falhas que podem ser simples — ou muito caras. Solicite uma leitura do computador de bordo com um scanner OBD2 antes de fechar o negócio.</p>
            <p>Inspecione o estado da bateria: uma bateria fraca pode mascarar outros problemas no alternador. Observe também o cabeamento visível no porta-malas e no motor — fiações improvisadas ou emendas indicam reparos mal feitos ou possível histórico de sinistro.</p>
            <div style={{ background: "#e8f5e9", border: "1px solid #1a7a4a", borderRadius: 8, padding: 16, marginTop: 16 }}>
              <strong>✅ Dica:</strong> Um scanner OBD2 portátil custa menos de R$ 100 e pode ser comprado em qualquer loja de autopeças. Vale o investimento se você compra veículos com frequência.
            </div>
          </section>

          <section aria-labelledby="documentacao-heading" style={{ marginBottom: 40 }}>
            <h2 id="documentacao-heading" style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", marginBottom: 12 }}>
              📋 Documentação: não assine nada antes de verificar
            </h2>
            <p>A documentação é tão importante quanto o estado mecânico. Verifique o CRLV (Certificado de Registro e Licenciamento de Veículo) e confira se o número do chassi no documento bate com o chassi físico do carro — geralmente gravado na placa na base do para-brisa e em pontos estruturais da carroceria.</p>
            <p>Consulte gratuitamente a situação do veículo no site do DETRAN-SP e no sistema RENAVAM: você descobre se há multas, débitos de IPVA, alienação fiduciária (veículo dado como garantia em financiamento) ou restrições judiciais. Um veículo com alienação não pode ser transferido até a quitação da dívida.</p>
            <p>Pesquise o histórico de sinistros no portal da SUSEP ou em serviços como o Consulta Veículos do DENATRAN. Um veículo com histórico de colisão grave ou enchente pode estar estruturalmente comprometido, mesmo após reparos aparentemente perfeitos.</p>
            <div style={{ background: "#fdecea", border: "1px solid #c0392b", borderRadius: 8, padding: 16, marginTop: 16 }}>
              <strong>🚫 Nunca compre</strong> veículos com chassi adulterado, lacres de airbag rompidos sem justificativa, ou quando o vendedor se recusa a fazer a transferência imediata. São sinais clássicos de veículo clonado ou com histórico escondido.
            </div>
          </section>

          <section aria-labelledby="golpes-heading" style={{ marginBottom: 40 }}>
            <h2 id="golpes-heading" style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", marginBottom: 12 }}>
              🛡️ Golpes comuns e como se proteger em {c.nome}
            </h2>
            <p>O mercado de veículos usados é um dos mais visados por estelionatários. Conheça os golpes mais comuns para não cair em nenhum deles:</p>
            <p><strong>Golpe do Pix antecipado:</strong> O vendedor pede um sinal via Pix para "reservar" o veículo antes da visita. Uma vez enviado o valor, o contato some. <strong>Regra de ouro: nunca envie dinheiro antes de ver e testar o veículo pessoalmente.</strong></p>
            <p><strong>Veículo clonado:</strong> Um carro roubado recebe placas e documentação de um veículo idêntico (mesmo modelo, cor e ano). Sempre verifique os números de chassi em vários pontos do carro e confira com o documento.</p>
            <p><strong>Test drive sem retorno:</strong> O comprador solicita um test drive e não volta. Nunca entregue as chaves do veículo a um estranho sem antes conferir um documento com foto e, preferencialmente, acompanhá-lo no test drive.</p>
            <p><strong>Anúncio falso com preço muito abaixo do mercado:</strong> Desconfie sempre de preços muito abaixo da tabela FIPE. Consulte a FIPE no próprio anúncio — a VibeCarros exibe a comparação automaticamente em todos os veículos.</p>
            <div style={{ background: "#e3f2fd", border: "1px solid #1E3A5F", borderRadius: 8, padding: 16, marginTop: 16 }}>
              <strong>ℹ️ Aviso importante:</strong> A VibeCarros é uma plataforma de anúncios. As informações dos veículos são cadastradas pelos próprios anunciantes. A VibeCarros não se responsabiliza por informações incorretas, ações de má-fé ou negociações realizadas fora da plataforma. Sempre negocie com cautela e faça sua própria verificação antes de fechar qualquer negócio.
            </div>
          </section>

          <section aria-labelledby="negociacao-heading" style={{ marginBottom: 40 }}>
            <h2 id="negociacao-heading" style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", marginBottom: 12 }}>
              💰 Como negociar bem e fechar um bom negócio
            </h2>
            <p>Pesquise o preço FIPE do modelo antes de visitar o veículo — isso coloca você em posição de negociação. Veículos acima de 10% da FIPE precisam de justificativa (revisões em dia, pneus novos, acessórios); veículos muito abaixo da FIPE merecem atenção redobrada.</p>
            <p>Liste todos os problemas encontrados na vistoria e use-os como argumento de desconto. Uma borracha de porta ressecada, pastilhas a trocar, pneu furado — cada item tem valor e pode reduzir o preço final.</p>
            <p>Exija a transferência do veículo no mesmo dia ou deixe explícito no contrato de compra e venda (com firma reconhecida) que a transferência é responsabilidade do vendedor. Veículos que ficam no nome do antigo dono acumulam multas e responsabilidades para quem compra.</p>
          </section>

          <section aria-labelledby="fipe-heading" style={{ marginBottom: 40 }}>
            <h2 id="fipe-heading" style={{ fontSize: 22, fontWeight: 700, color: "#1E3A5F", marginBottom: 12 }}>
              📊 Tabela FIPE: seu maior aliado na compra
            </h2>
            <p>A Tabela FIPE é a referência oficial de preços de veículos no Brasil, publicada mensalmente pela Fundação Instituto de Pesquisas Econômicas. Ela reflete o preço médio de mercado para cada modelo, ano e versão específica.</p>
            <p>Na VibeCarros, todos os anúncios mostram automaticamente o preço FIPE do veículo anunciado, para que você saiba exatamente se o preço pedido está acima, abaixo ou na média do mercado. Isso elimina a assimetria de informação — uma das causas mais comuns de prejuízo na compra de usados.</p>
            <p>Use a FIPE como ponto de partida, mas lembre-se: ela é uma média. Veículos em melhor estado podem custar mais; veículos com problemas devem custar menos.</p>
          </section>

        </div>

        {/* CTA FINAL */}
        <div style={{ background: "linear-gradient(135deg,#1E3A5F,#2d5a8e)", borderRadius: 12, padding: 32, textAlign: "center", color: "#fff", marginTop: 40 }}>
          <h2 style={{ fontSize: 22, margin: "0 0 8px", fontWeight: 700 }}>Encontrou o que procurava?</h2>
          <p style={{ margin: "0 0 20px", opacity: 0.9 }}>Veja todos os veículos disponíveis em {c.nome} e região com comparação FIPE automática.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/?cidade=${c.nome}`} style={{ background: "#fff", color: "#1E3A5F", padding: "10px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
              Ver veículos em {c.nome}
            </Link>
            <Link href="/anunciar" style={{ background: "transparent", border: "2px solid #fff", color: "#fff", padding: "10px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
              Anunciar meu veículo
            </Link>
          </div>
        </div>

        {/* LINKS OUTRAS CIDADES */}
        <nav aria-label="Blogs de outras cidades" style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #eee" }}>
          <p style={{ fontWeight: 700, color: "#1E3A5F", marginBottom: 12 }}>📍 Veja também outras cidades atendidas:</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {Object.entries(CIDADES)
              .filter(([slug]) => slug !== cidade)
              .map(([slug, info]) => (
                <Link key={slug} href={`/blog/${slug}`}
                  style={{ background: "#f0f4f8", color: "#1E3A5F", padding: "6px 14px", borderRadius: 20, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
                  {info.nome}
                </Link>
              ))}
          </div>
        </nav>

      </div>
    </>
  )
}
