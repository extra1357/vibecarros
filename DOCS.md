# VibeCarros — Documentação Técnica
**Versão:** 1.1.0
**Empresa:** Cotawebseguros Ltda. — CNPJ 23.659.612/0001-96
**Marca:** VibeCarros
**Desenvolvido por:** Strsoftware
**Contato:** vibecarros-salto@gmail.com
**Última atualização:** Abril 2026

## Changelog

### v1.1.0 — Abril 2026
- feat: Blog SEO por cidade (Itu, Salto, Indaiatuba, Sorocaba, Porto Feliz)
- feat: Sitemap dinamico em /sitemap.xml
- feat: Footer com links para guias por cidade
- feat: Produtos e precos criados no Stripe (5 planos)
- feat: Webhook do Stripe configurado e funcional em producao
- feat: Fluxo de pagamento completo e testado em producao
- feat: Pagina de Termos de Uso (/termos) — Cotawebseguros CNPJ 23.659.612/0001-96
- feat: Link pulsante para Termos no footer
- feat: Protecao do WhatsApp contra scraping via /api/wpp/[id]
- fix: Cookie de sessao sem maxAge — logout automatico ao fechar navegador
- fix: Client Components para hover no blog (CidadeCard, VeiculoCard)
- fix: consent_collection removido do checkout Stripe
- fix: params como Promise nas API Routes do Next.js 16
- fix: NEXT_PUBLIC_APP_URL configurado para producao no Vercel

### v1.0.0 — Marco 2026
- Lancamento inicial com autenticacao, anuncios, upload de fotos, planos e painel

## Stack

| Camada | Tecnologia | Versao |
|--------|-----------|--------|
| Framework | Next.js | 16.2.2 |
| Linguagem | TypeScript | 5.x |
| ORM | Prisma | 7.6.0 |
| Banco | Neon PostgreSQL | Serverless |
| Auth | JWT + bcryptjs | — |
| Pagamentos | Stripe | SDK v18 |
| Upload | Vercel Blob | — |
| Email | Resend | — |
| Deploy | Vercel | — |

## Rotas da API

| Metodo | Rota | Auth | Descricao |
|--------|------|------|-----------|
| POST | /api/auth/registro | N | Cria conta |
| POST | /api/auth/login | N | Autentica e seta cookie JWT |
| POST | /api/auth/logout | N | Remove cookie |
| GET | /api/me | S | Dados do usuario logado |
| GET | /api/anuncios | N | Listagem publica |
| POST | /api/anuncios | S | Cria anuncio com fotos |
| PATCH | /api/anuncios/[id] | S | Ativar/inativar/vendido |
| DELETE | /api/anuncios/[id] | S | Remove anuncio |
| GET | /api/painel/anuncios | S | Lista anuncios do usuario |
| POST | /api/stripe/checkout | S | Cria sessao de checkout |
| POST | /api/stripe/webhook | Stripe | Recebe eventos do Stripe |
| GET | /api/wpp/[id] | N | Redireciona para WhatsApp protegido |
| POST | /api/acesso | N | Registra acesso unico por IP |

## Planos Stripe (producao)

| PlanoId | Nome | Preco | Anuncios | Fotos | Prazo |
|---------|------|-------|----------|-------|-------|
| free | Gratuito | R$ 0 | 2 | 4 | 30 dias |
| pf_plus | Plus | R$ 39 | 5 | 10 | 60 dias |
| pf_pro | Pro | R$ 79 | 10 | 15 | 90 dias |
| pj_starter | Loja Starter | R$ 149 | 20 | 15 | 60 dias |
| pj_pro | Loja Pro | R$ 299 | 50 | 20 | 90 dias |
| pj_premium | Loja Premium | R$ 499 | ilimitado | 25 | 120 dias |

Price IDs:
- STRIPE_PRICE_PF_PLUS=price_1TIdT9J2tKW7aefFbf7pBbRU
- STRIPE_PRICE_PF_PRO=price_1TIdT9J2tKW7aefFJm0EskfO
- STRIPE_PRICE_PJ_STARTER=price_1TIdTAJ2tKW7aefFIHeDyULI
- STRIPE_PRICE_PJ_PRO=price_1TIdTAJ2tKW7aefFUvJmOgFp
- STRIPE_PRICE_PJ_PREMIUM=price_1TIdTBJ2tKW7aefFz67sRwxY

Webhook: https://www.vibecarros.com.br/api/stripe/webhook
Eventos: checkout.session.completed, customer.subscription.deleted
Taxa Stripe: 4,99% + R$ 0,39 por transacao

## Seguranca

- Cookie httpOnly sem maxAge — logout automatico ao fechar navegador
- WhatsApp protegido via /api/wpp/[id] — numero nunca exposto no HTML
- JWT com validacao server-side em todas as rotas autenticadas
- bcrypt (12 rounds) para senhas
- Validacao de CPF/CNPJ no cadastro
- Webhook Stripe com verificacao de assinatura

PENDENCIA: proxy.ts protege /dashboard mas a rota real e /painel

## Paginas

| Rota | Tipo | Descricao |
|------|------|-----------|
| / | SSR | Home — listagem publica |
| /anuncio/[id] | SSR | Detalhe do veiculo |
| /anunciar | Client | Wizard de cadastro |
| /login | Static | Login |
| /registro | Client | Cadastro |
| /painel | Client | Dashboard do anunciante |
| /planos | Client | Planos e assinatura |
| /blog | SSG | Indice de guias por cidade |
| /blog/[cidade] | SSG | Guia por cidade com SEO |
| /termos | Static | Termos de Uso |
| /sitemap.xml | Dynamic | Sitemap automatico |

## Roadmap

### Urgente
- Corrigir proxy.ts: /dashboard -> /painel

### v1.2
- Expiracao de anuncios (expiraEm)
- Edicao de anuncio
- Email de confirmacao apos pagamento
- Painel admin basico

### v1.3
- Filtros avancados na home
- JSON-LD Vehicle em /anuncio/[id]
- Open Graph dinamico por anuncio
- PWA

### v1.4
- Analytics de cliques no WhatsApp
- Dashboard analitico para lojistas
- Rate limiting nas rotas publicas

## Contatos

| Area | Responsavel | Contato |
|------|------------|---------|
| Produto | Cotawebseguros | vibecarros-salto@gmail.com |
| Desenvolvimento | Strsoftware | vibecarros-salto@gmail.com |
| Infraestrutura | Vercel / Neon | dashboards respectivos |
| Pagamentos | Stripe | dashboard.stripe.com |

---
VibeCarros v1.1.0 — Cotawebseguros Ltda. CNPJ 23.659.612/0001-96
