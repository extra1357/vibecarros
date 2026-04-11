import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso | VibeCarros",
  description: "Termos de Uso da plataforma VibeCarros, operada pela Cotawebseguros.",
  alternates: { canonical: "https://www.vibecarros.com.br/termos" },
  robots: { index: true, follow: true },
}

export default function TermosPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 800, margin: "0 auto", padding: "40px 16px 80px", color: "#1a1a1a", lineHeight: 1.8 }}>

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Termos de Uso</h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 40 }}>Última atualização: abril de 2026</p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>1. Identificação da Plataforma</h2>
        <p>O <strong>VibeCarros</strong> é uma plataforma digital de divulgação de anúncios de veículos usados, operada por <strong>Cotawebseguros Ltda.</strong>, inscrita no CNPJ sob o nº <strong>23.659.612/0001-96</strong>, com sede no estado de São Paulo, Brasil.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>2. Natureza do Serviço</h2>
        <p style={{ marginBottom: 12 }}>O VibeCarros é uma plataforma de <strong>classificados e divulgação</strong>. Atuamos exclusivamente como canal de comunicação entre compradores e anunciantes.</p>
        <p style={{ marginBottom: 12 }}>A Cotawebseguros <strong>não</strong> vende, compra ou intermedia a venda de veículos; não participa de negociações; não recebe ou transfere valores das transações; não garante entrega, estado ou documentação dos veículos anunciados.</p>
        <p>A negociação ocorre <strong>diretamente entre comprador e vendedor</strong>, sem qualquer participação da plataforma.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>3. Responsabilidade pelos Anúncios</h2>
        <p>As informações de cada anúncio são de <strong>responsabilidade exclusiva do anunciante</strong>. A Cotawebseguros não realiza vistoria ou verificação técnica dos veículos. Recomendamos vistoria presencial e consulta a profissional habilitado antes de qualquer negociação.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>4. Cadastro e Conta</h2>
        <p>Para anunciar é necessário cadastro com CPF ou CNPJ válido. O anunciante é responsável pela veracidade das informações. A Cotawebseguros pode suspender contas que violem estes Termos ou publiquem informações falsas.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>5. Planos e Pagamentos</h2>
        <p>Os planos pagos são cobrados mensalmente via cartão de crédito processado pela <strong>Stripe</strong>. O cancelamento pode ser feito a qualquer momento sem multa, com efeito no próximo ciclo. Os valores referem-se exclusivamente ao serviço de divulgação.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>6. Condutas Proibidas</h2>
        <p>É vedado publicar anúncios de veículos que não sejam de sua propriedade legítima; inserir informações falsas ou fraudulentas; utilizar a plataforma para aplicar golpes; publicar veículos com restrições ocultadas; usar meios automatizados para extrair dados da plataforma.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>7. Proteção ao Comprador</h2>
        <p>O VibeCarros disponibiliza conteúdo educativo sobre como comprar com segurança e identificar golpes. Caso identifique anúncio suspeito, entre em contato pelo e-mail <strong>vibecarros-salto@gmail.com</strong>.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>8. Limitação de Responsabilidade</h2>
        <p>Na máxima extensão permitida pela lei brasileira, a Cotawebseguros não será responsável por danos decorrentes de negociações entre usuários, incluindo fraudes, vícios ocultos do veículo ou inadimplência entre as partes.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>9. Privacidade e LGPD</h2>
        <p>Os dados pessoais são utilizados exclusivamente para viabilizar o serviço, em conformidade com a LGPD (Lei nº 13.709/2018). Dúvidas: <strong>vibecarros-salto@gmail.com</strong>.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>10. Alterações nos Termos</h2>
        <p>A Cotawebseguros pode alterar estes Termos a qualquer momento. O uso continuado da plataforma após as alterações implica na aceitação dos novos Termos.</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>11. Foro e Legislação</h2>
        <p>Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Salto, São Paulo, para dirimir controvérsias.</p>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>12. Contato</h2>
        <p><strong>Cotawebseguros Ltda.</strong><br />CNPJ: 23.659.612/0001-96<br />Marca: VibeCarros<br />E-mail: vibecarros-salto@gmail.com<br />São Paulo, Brasil</p>
      </section>

    </div>
  )
}
