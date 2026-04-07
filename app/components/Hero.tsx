export default function Hero({ totalAcessos }: { totalAcessos?: number }) {
  return (
    <section className="hero">
      <div className="hero-tag">🚗 Marketplace regional de veículos — Itu, Salto, Indaiatuba e região</div>
      <h1>Compre e Venda com<br/><span>Transparência Real</span></h1>
      <p>Comparação automática com a Tabela FIPE em cada anúncio. Você sabe exatamente se está fazendo um bom negócio.</p>
      <div className="hero-stats">
        <div className="hero-stat"><strong>FIPE</strong><span>em todo anúncio</span></div>
        <div className="hero-stat"><strong>100%</strong><span>anúncios verificados</span></div>
        <div className="hero-stat">
          <strong>{totalAcessos ? totalAcessos.toLocaleString("pt-BR") : "—"}</strong>
          <span>visitas ao site</span>
        </div>
      </div>
    </section>
  )
}
