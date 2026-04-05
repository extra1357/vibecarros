# VibeCarros — Documentação Técnica
**Versão:** 1.0.0  
**Empresa:** Cotawebseguros  
**Marca:** VibeCarros  
**Desenvolvido por:** Strsoftware  
**Contato técnico:** vibecarros-salto@gmail.com  
**Data:** Abril 2026  

---

## Sumário

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Estrutura de Diretórios](#3-estrutura-de-diretórios)
4. [Banco de Dados — Schema Prisma](#4-banco-de-dados--schema-prisma)
5. [Autenticação e Autorização](#5-autenticação-e-autorização)
6. [Rotas da API](#6-rotas-da-api)
7. [Páginas e Componentes](#7-páginas-e-componentes)
8. [Planos e Monetização — Stripe](#8-planos-e-monetização--stripe)
9. [Upload de Arquivos — Vercel Blob](#9-upload-de-arquivos--vercel-blob)
10. [Variáveis de Ambiente](#10-variáveis-de-ambiente)
11. [Proxy / Middleware](#11-proxy--middleware)
12. [Fluxos Principais](#12-fluxos-principais)
13. [Deploy — Vercel + Neon](#13-deploy--vercel--neon)
14. [Manutenção e Operação](#14-manutenção-e-operação)
15. [Decisões de Arquitetura (ADRs)](#15-decisões-de-arquitetura-adrs)
16. [Pendências e Roadmap](#16-pendências-e-roadmap)

---

## 1. Visão Geral da Arquitetura

O VibeCarros é um marketplace regional de veículos (Itu, Salto, Indaiatuba, Sorocaba e Porto Feliz) com exposição nacional. A aplicação segue a arquitetura **Full-Stack Serverless** com renderização híbrida (SSR + Static).

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│              Browser / Mobile (PWA-ready)                   │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────┐
│                     VERCEL EDGE                             │
│         Next.js 16.2.2 (App Router + Turbopack)             │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Static Pages │  │  SSR Pages   │  │   API Routes     │  │
│  │  /, /login   │  │ /anuncio/[id]│  │ /api/**          │  │
│  │  /planos     │  │              │  │                  │  │
│  └──────────────┘  └──────────────┘  └────────┬─────────┘  │
│                                               │             │
│  ┌─────────────────────────────────────────── │ ─────────┐  │
│  │              proxy.ts (Middleware)         │          │  │
│  │     Proteção de rotas via JWT cookie       │          │  │
│  └─────────────────────────────────────────── │ ─────────┘  │
└───────────────────────────────────────────────┼─────────────┘
                                                │
              ┌─────────────────────────────────┼──────────┐
              │                                 │          │
┌─────────────▼──────┐  ┌──────────────┐  ┌────▼────────┐ │
│   NEON POSTGRES    │  │ VERCEL BLOB  │  │   STRIPE    │ │
│  (Serverless DB)   │  │ (Fotos/mídia)│  │ (Pagamentos)│ │
│  Prisma 7 ORM      │  │              │  │             │ │
└────────────────────┘  └──────────────┘  └─────────────┘ │
                                                           │
                    ┌──────────────────────────────────────┘
                    │
              ┌─────▼──────┐
              │   RESEND   │
              │  (E-mails) │
              └────────────┘
```

### Princípios arquiteturais adotados

- **Cookie httpOnly** para JWT — sem exposição do token no frontend (XSS-safe)
- **Server Components** para páginas públicas — SEO e performance
- **Client Components** apenas onde há interatividade (formulários, carrossel)
- **API Routes serverless** — sem servidor dedicado, escala automaticamente
- **Schema-first** com Prisma — banco é fonte de verdade, nunca ao contrário
- **Sem ORM em client components** — banco só é acessado via API Routes

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| Framework | Next.js | 16.2.2 | App Router, RSC, Turbopack |
| Linguagem | TypeScript | 5.x | Type safety end-to-end |
| ORM | Prisma | 7.6.0 | Type-safe, migrations, Neon adapter |
| Banco | Neon PostgreSQL | Serverless | Escala a zero, branch por ambiente |
| Auth | JWT + bcryptjs | — | Sem dependência de serviço externo |
| Pagamentos | Stripe | SDK v18 | Líder de mercado, webhooks confiáveis |
| Upload | Vercel Blob | — | CDN integrado, custo por uso |
| E-mail | Resend | — | 3k/mês grátis, DX superior |
| Deploy | Vercel | — | Zero-config com Next.js |
| CSS | Inline styles | — | Zero bundle CSS, colocação com componente |

---

## 3. Estrutura de Diretórios

```
vibecarros/
├── app/
│   ├── api/
│   │   ├── anuncios/
│   │   │   ├── route.ts          # POST (criar) + GET (listagem pública)
│   │   │   └── [id]/
│   │   │       └── route.ts      # PATCH (ativar/inativar/vendido) + DELETE
│   │   ├── auth/
│   │   │   ├── login/route.ts    # POST — autenticação com JWT
│   │   │   ├── registro/route.ts # POST — cadastro de usuário
│   │   │   └── logout/route.ts   # POST — limpa cookie
│   │   ├── me/
│   │   │   └── route.ts          # GET — dados do usuário logado
│   │   ├── painel/
│   │   │   └── anuncios/route.ts # GET (meus anúncios) + PATCH (ações)
│   │   └── stripe/
│   │       ├── checkout/route.ts # POST — cria sessão de checkout
│   │       └── webhook/route.ts  # POST — eventos do Stripe
│   ├── anunciar/
│   │   └── page.tsx              # Wizard de criação de anúncio (Client)
│   ├── anuncio/
│   │   └── [id]/
│   │       └── page.tsx          # Página de detalhe do veículo (SSR)
│   ├── components/
│   │   ├── CarCard.tsx           # Card de veículo na listagem
│   │   ├── Listings.tsx          # Grid de anúncios com busca
│   │   ├── Navbar.tsx            # Navegação global
│   │   └── Footer.tsx            # Rodapé
│   ├── login/
│   │   └── page.tsx              # Página de login (Static + Suspense)
│   ├── painel/
│   │   └── page.tsx              # Dashboard do anunciante (Client)
│   ├── planos/
│   │   └── page.tsx              # Página de planos e preços (Client)
│   ├── registro/
│   │   └── page.tsx              # Cadastro de usuário (Client)
│   ├── layout.tsx                # Layout raiz com metadados
│   ├── page.tsx                  # Home — listagem pública (SSR)
│   └── globals.css               # Reset e variáveis CSS globais
├── lib/
│   ├── auth.ts                   # JWT, bcrypt, helpers de autenticação
│   ├── planos.ts                 # Definição dos planos e limites
│   ├── prisma.ts                 # Singleton do Prisma Client com Neon adapter
│   ├── stripe.ts                 # Instância do Stripe SDK
│   └── validacoes.ts             # CPF, CNPJ, cidades de cobertura
├── prisma/
│   ├── schema.prisma             # Schema do banco de dados
│   └── migrations/               # Histórico de migrations
├── prisma.config.ts              # Configuração Prisma 7 (datasource, adapter)
├── proxy.ts                      # Middleware de proteção de rotas
├── next.config.ts                # Configuração do Next.js
├── package.json
└── tsconfig.json
```

---

## 4. Banco de Dados — Schema Prisma

### Conexão

O projeto usa **Neon PostgreSQL** com duas URLs:

- `DATABASE_URL` — URL com `-pooler` (PgBouncer) para queries em runtime via serverless
- `DIRECT_URL` — URL sem pooler para migrations (DDL direto)

O Prisma 7 usa o adapter `@prisma/adapter-neon` que substitui o driver padrão pg.

```typescript
// lib/prisma.ts
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })
```

### Modelos

#### `Usuario`

```prisma
model Usuario {
  id                   String    @id @default(cuid())
  nome                 String
  email                String    @unique
  senha                String                        // bcrypt hash (12 rounds)
  documento            String    @unique             // CPF ou CNPJ (somente números)
  tipDoc               String                        // "CPF" | "CNPJ"
  whatsapp             String                        // (11) 99999-9999
  cidade               String                        // dentro de CIDADES_COBERTURA
  estado               String
  plano                String    @default("free")    // PlanoId
  ativo                Boolean   @default(true)
  criadoEm             DateTime  @default(now())
  stripeCustomerId     String?                       // customer_xxx do Stripe
  stripeSubscriptionId String?                       // sub_xxx do Stripe
  planoExpiraEm        DateTime?                     // data de expiração da assinatura
  anuncios             Anuncio[]
}
```

#### `Anuncio`

```prisma
model Anuncio {
  id            String    @id @default(cuid())
  usuarioId     String
  usuario       Usuario   @relation(fields: [usuarioId], references: [id])
  categoria     String                              // "Carros", "Motos", etc
  marca         String
  modelo        String
  versao        String?
  anoFab        Int
  anoMod        Int
  km            Int
  combustivel   String
  cambio        String
  cor           String
  portas        Int?
  blindado      Boolean   @default(false)
  financiamento Boolean   @default(false)
  troca         Boolean   @default(false)
  preco         Int                                 // em centavos
  fipe          Int?                               // em centavos
  placa         String?
  descricao     String?
  destaque      Boolean   @default(false)          // pago — aparece primeiro
  ativo         Boolean   @default(true)
  criadoEm      DateTime  @default(now())
  fotos         Foto[]
}
```

#### `Foto`

```prisma
model Foto {
  id        String   @id @default(cuid())
  anuncioId String
  anuncio   Anuncio  @relation(fields: [anuncioId], references: [id])
  url       String                                  // URL do Vercel Blob
  ordem     Int      @default(0)                   // ordem no carrossel
}
```

### Comandos úteis

```bash
# Aplicar mudanças no schema (desenvolvimento)
npx prisma migrate dev --name descricao_da_mudanca

# Aplicar migrations em produção
npx prisma migrate deploy

# Resetar banco (DESTRÓI DADOS — só dev)
npx prisma migrate reset --force

# Forçar sync do schema sem migration (cuidado em prod)
npx prisma db push

# Regenerar Prisma Client após mudanças no schema
npx prisma generate

# Abrir Prisma Studio (GUI do banco)
npx prisma studio
```

---

## 5. Autenticação e Autorização

### Fluxo de autenticação

```
POST /api/auth/registro
  → valida CPF/CNPJ e cidade de cobertura
  → bcrypt.hash(senha, 12)
  → prisma.usuario.create()
  → jwt.sign({ id, email, tipoDoc }, JWT_SECRET, { expiresIn: "7d" })
  → res.cookies.set("token", jwt, { httpOnly: true, sameSite: "lax" })
  → 201 { ok: true, nome }

POST /api/auth/login
  → prisma.usuario.findUnique({ where: { email } })
  → bcrypt.compare(senha, hash)
  → jwt.sign(payload, JWT_SECRET)
  → res.cookies.set("token", ...)
  → 200 { ok: true, nome }

POST /api/auth/logout
  → res.cookies.delete("token")
  → 200 { ok: true }
```

### JWT Payload

```typescript
interface JwtPayload {
  id: string           // cuid do usuário no banco
  email: string
  tipoDoc: "CPF" | "CNPJ"
}
```

### Proteção de rotas (Server-side)

```typescript
// lib/auth.ts
export async function getUsuarioLogado(): Promise<JwtPayload | null> {
  const cookieStore = await cookies()       // next/headers — async no Next 15+
  const token = cookieStore.get("token")?.value
  if (!token) return null
  return jwt.verify(token, SECRET) as JwtPayload
}
```

### Proteção de rotas (Middleware)

```typescript
// proxy.ts — executado no Edge antes de cada request
export function proxy(request: NextRequest) {
  const rotasProtegidas = ["/anunciar", "/dashboard", "/perfil"]
  const precisaAuth = rotasProtegidas.some(r => request.nextUrl.pathname.startsWith(r))
  if (precisaAuth && !request.cookies.get("token")?.value) {
    return NextResponse.redirect(new URL("/login?redirect=...", request.url))
  }
  return NextResponse.next()
}
```

> **Atenção:** No Next.js 16 o arquivo `middleware.ts` foi renomeado para `proxy.ts` e a função exportada deve se chamar `proxy` (não `middleware`).

### Validações de documentos

O `lib/validacoes.ts` implementa:
- Algoritmo oficial de validação de **CPF** (dois dígitos verificadores)
- Algoritmo oficial de validação de **CNPJ** (dois dígitos verificadores)
- Detecção automática de tipo pelo número de dígitos
- Lista de cidades de cobertura: `["Itu", "Salto", "Indaiatuba", "Sorocaba", "Porto Feliz"]`

---

## 6. Rotas da API

### Autenticação

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/auth/registro` | ✗ | Cria conta com CPF/CNPJ |
| POST | `/api/auth/login` | ✗ | Autentica e seta cookie JWT |
| POST | `/api/auth/logout` | ✗ | Remove cookie JWT |
| GET | `/api/me` | ✓ | Retorna dados do usuário logado |

### Anúncios públicos

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/api/anuncios` | ✗ | Listagem com filtros (cidade, categoria, página) |
| POST | `/api/anuncios` | ✓ | Cria anúncio com fotos (multipart/form-data) |
| PATCH | `/api/anuncios/[id]` | ✓ | Ativar / inativar / marcar como vendido |
| DELETE | `/api/anuncios/[id]` | ✓ | Remove anúncio e fotos do Blob |

### Painel do anunciante

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/api/painel/anuncios` | ✓ | Lista anúncios do usuário logado |
| PATCH | `/api/painel/anuncios` | ✓ | Ações: ativar, inativar, deletar |

### Stripe

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/api/stripe/checkout` | ✓ | Cria sessão de checkout (assinatura) |
| POST | `/api/stripe/webhook` | Stripe-Sig | Recebe eventos do Stripe |

### Criação de anúncio — formato da requisição

```
POST /api/anuncios
Content-Type: multipart/form-data

veiculo: JSON.stringify({
  categoria, marca, modelo, versao, anoFab, anoMod,
  km, combustivel, cambio, cor, portas, blindado,
  financiamento, troca, preco, fipe, placa, descricao
})
fotos: File[] (máx 2MB por foto, limite conforme plano)
```

---

## 7. Páginas e Componentes

### Páginas

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | SSR | Home — listagem pública de anúncios |
| `/anuncio/[id]` | SSR | Detalhe do veículo com carrossel |
| `/anunciar` | Client | Wizard de cadastro de anúncio (4 etapas) |
| `/login` | Static + Suspense | Login com redirect pós-autenticação |
| `/registro` | Client | Cadastro de conta |
| `/painel` | Client | Dashboard do anunciante |
| `/planos` | Client | Página de planos e assinatura |

### Wizard `/anunciar` — etapas

```
1. Veículo    → dados técnicos (categoria, marca, modelo, km, etc.)
2. Fotos      → upload de até N fotos (limite por plano)
3. Publicar   → revisão + botão publicar
               (dados de contato vêm automaticamente do cadastro via /api/me)
```

> **Decisão de design:** A etapa "Contato" foi removida do wizard. Os dados do anunciante (nome, whatsapp, cidade, estado) são preenchidos automaticamente via `useMe()` que consulta `/api/me` com o cookie de sessão.

### Hook `useMe()`

```typescript
function useMe() {
  const [me, setMe] = useState<UsuarioMe | null>(null)
  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(r => {
        if (r.status === 401) { window.location.href = "/login?redirect=/anunciar"; return null }
        return r.json()
      })
      .then(data => { if (data) setMe(data) })
  }, [])
  return me
}
```

### Componente `CarCard`

Recebe um `Anuncio` com `fotos` e `usuario` opcionais. Renderiza:
- Foto de capa (primeira da lista)
- Badge "Destaque" se `destaque === true`
- Preço com formatação BRL
- Link para WhatsApp com mensagem pré-preenchida (`wa.me/55{numero}`)
- Click no card navega para `/anuncio/[id]`

---

## 8. Planos e Monetização — Stripe

### Definição dos planos (`lib/planos.ts`)

| PlanoId | Nome | Preço/mês | Anúncios | Fotos/veículo | Prazo | Tipo |
|---------|------|-----------|----------|---------------|-------|------|
| `free` | Gratuito | R$ 0 | 2 | 4 | 30 dias | CPF/CNPJ |
| `pf_plus` | Plus | R$ 39 | 5 | 10 | 60 dias | CPF |
| `pf_pro` | Pro | R$ 79 | 10 | 15 | 90 dias | CPF |
| `pj_starter` | Loja Starter | R$ 149 | 20 | 15 | 60 dias | CNPJ |
| `pj_pro` | Loja Pro | R$ 299 | 50 | 20 | 90 dias | CNPJ |
| `pj_premium` | Loja Premium | R$ 499 | ilimitado | 25 | 120 dias | CNPJ |

### Fluxo de assinatura

```
1. Usuário atinge limite de anúncios
2. API retorna { error: "...", upgrade: true }
3. Frontend redireciona para /planos
4. Usuário escolhe plano → POST /api/stripe/checkout
5. Backend cria/recupera Stripe Customer
6. Cria Checkout Session (mode: "subscription")
7. Redireciona para Stripe Hosted Page
8. Pagamento aprovado → webhook checkout.session.completed
9. Webhook atualiza Usuario.plano + planoExpiraEm
10. Usuário volta para /painel?sucesso=1
```

### Webhooks tratados

| Evento | Ação |
|--------|------|
| `checkout.session.completed` | Ativa plano, salva `stripeSubscriptionId`, calcula `planoExpiraEm` |
| `customer.subscription.deleted` | Rebaixa para `free`, limpa `stripeSubscriptionId` |

### Configuração do Stripe CLI (desenvolvimento)

```bash
# Instalar (Linux)
curl -L "https://github.com/stripe/stripe-cli/releases/download/v1.21.0/stripe_1.21.0_linux_x86_64.tar.gz" -o /tmp/stripe.tar.gz
tar -xzf /tmp/stripe.tar.gz -C /tmp
sudo mv /tmp/stripe /usr/local/bin/stripe

# Autenticar
stripe login

# Escutar webhooks localmente
stripe listen --forward-to localhost:3000/api/stripe/webhook
# → copia o whsec_... para STRIPE_WEBHOOK_SECRET no .env
```

---

## 9. Upload de Arquivos — Vercel Blob

As fotos dos veículos são armazenadas no **Vercel Blob** com CDN global.

```typescript
// Dentro de POST /api/anuncios
import { put } from "@vercel/blob"

const blob = await put(`veiculos/${Date.now()}-${foto.name}`, foto, { access: "public" })
urlsFotos.push(blob.url)
// blob.url → https://xxxx.public.blob.vercel-storage.com/veiculos/...
```

### Limites e custos estimados

- Tamanho máximo por foto: **2MB**
- Custo Vercel Blob: **$0,023/GB/mês**
- Plano Loja Premium (ilimitado × 25 fotos × 2MB): ~50MB/cliente → ~$0,001/mês/cliente

### Remoção de fotos

Ao deletar um anúncio, as fotos devem ser removidas do Blob:

```typescript
import { del } from "@vercel/blob"
await Promise.allSettled(anuncio.fotos.map(f => del(f.url)))
```

> **TODO:** Implementar remoção de fotos antigas ao editar anúncio.

---

## 10. Variáveis de Ambiente

### Arquivo `.env` (nunca commitar)

```env
# Banco de dados Neon
DATABASE_URL=postgresql://user:pass@host-pooler.neon.tech/db?sslmode=require&channel_binding=require
DIRECT_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require&channel_binding=require

# JWT
JWT_SECRET=<openssl rand -base64 32>
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (criados via script node)
STRIPE_PRICE_PF_PLUS=price_...
STRIPE_PRICE_PF_PRO=price_...
STRIPE_PRICE_PJ_STARTER=price_...
STRIPE_PRICE_PJ_PRO=price_...
STRIPE_PRICE_PJ_PREMIUM=price_...

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Resend (e-mail)
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=https://vibecarros.com.br
```

### Variáveis públicas (`NEXT_PUBLIC_*`)

São expostas ao browser no bundle JS. Nunca colocar segredos nelas.

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — chave pública do Stripe (seguro)
- `NEXT_PUBLIC_APP_URL` — URL base da aplicação

---

## 11. Proxy / Middleware

O arquivo `proxy.ts` na raiz do projeto é executado no **Vercel Edge** antes de cada requisição às rotas protegidas.

```typescript
// proxy.ts
export function proxy(request: NextRequest) {
  const rotasProtegidas = ["/anunciar", "/dashboard", "/perfil"]
  const precisaAuth = rotasProtegidas.some(r => request.nextUrl.pathname.startsWith(r))
  if (precisaAuth) {
    const token = request.cookies.get("token")?.value
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/anunciar/:path*", "/dashboard/:path*", "/perfil/:path*"],
}
```

> **Atenção:** No Next.js 16 o nome do arquivo e da função exportada mudaram de `middleware` para `proxy`. Se ambos existirem simultaneamente, o build falhará.

---

## 12. Fluxos Principais

### Fluxo de cadastro e publicação

```
[Usuario] → /registro
  → preenche: nome, email, senha, CPF/CNPJ, whatsapp, cidade, estado
  → POST /api/auth/registro
  → cookie JWT setado
  → redirect /painel

[Usuario] → /anunciar (proxy verifica cookie)
  → useMe() busca /api/me → preenche contato automaticamente
  → Etapa 1: dados do veículo
  → Etapa 2: upload de fotos
  → Etapa 3: revisão → botão "Publicar"
  → POST /api/anuncios (multipart, cookie enviado automaticamente)
  → Vercel Blob armazena fotos
  → Prisma cria Anuncio + Fotos
  → 201 → redirect /painel
```

### Fluxo de upgrade de plano

```
[Usuario] → atinge limite de anúncios
  → API retorna 422 { upgrade: true }
  → redirect /planos
  → escolhe plano → POST /api/stripe/checkout
  → cria/recupera Stripe Customer
  → redirect para Stripe Hosted Checkout
  → pagamento aprovado
  → Stripe POST /api/stripe/webhook (checkout.session.completed)
  → prisma.usuario.update({ plano, stripeSubscriptionId, planoExpiraEm })
  → redirect /painel?sucesso=1
```

### Fluxo de cancelamento/inadimplência

```
[Stripe] → customer.subscription.deleted
  → webhook → prisma.usuario.update({ plano: "free", stripeSubscriptionId: null })
  → próxima tentativa de criar anúncio → limite free aplicado
```

---

## 13. Deploy — Vercel + Neon

### Pré-requisitos

1. Conta Vercel conectada ao repositório GitHub
2. Banco Neon criado com branch `main` para produção
3. Produtos e preços criados no Stripe (script em `/lib/planos.ts`)
4. Vercel Blob store criado no projeto Vercel
5. Conta Resend configurada com domínio verificado

### Passos para deploy inicial

```bash
# 1. Push para GitHub
git add .
git commit -m "feat: vibecarros v1.0"
git push origin main

# 2. Importar projeto no Vercel
# → vercel.com/new → Import Git Repository

# 3. Configurar variáveis de ambiente no Vercel Dashboard
# → Settings → Environment Variables → adicionar todas do .env

# 4. Configurar webhook do Stripe para produção
# → Stripe Dashboard → Developers → Webhooks → Add endpoint
# → URL: https://vibecarros.com.br/api/stripe/webhook
# → Eventos: checkout.session.completed, customer.subscription.deleted

# 5. Rodar migration em produção
npx prisma migrate deploy
```

### Configuração do Neon para produção

- **Branch `main`** → produção (DATABASE_URL + DIRECT_URL apontam aqui)
- **Branch `dev`** → desenvolvimento local (opcional, recomendado)
- Ativar **Connection Pooling** na URL de runtime (`-pooler` no hostname)

---

## 14. Manutenção e Operação

### Monitoramento

- **Vercel Dashboard** → Functions tab → logs de API Routes em tempo real
- **Neon Console** → Monitoring → queries lentas e uso de conexões
- **Stripe Dashboard** → Developers → Logs → todas as chamadas de API e webhooks

### Backup do banco

O Neon faz backup automático com Point-in-Time Recovery (PITR) de 7 dias no plano gratuito e 30 dias no Pro.

### Adição de nova cidade de cobertura

```typescript
// lib/validacoes.ts
export const CIDADES_COBERTURA = [
  "Itu", "Salto", "Indaiatuba", "Sorocaba", "Porto Feliz",
  "Nova Cidade"  // adicionar aqui
]
```

### Adição de novo plano

1. Criar produto/preço no Stripe Dashboard ou via SDK
2. Adicionar `STRIPE_PRICE_NOVO=price_xxx` no `.env` e Vercel
3. Adicionar entrada em `lib/planos.ts`

### Renovação de anúncios vencidos

Atualmente não há prazo automático implementado no banco (campo `criadoEm` existe, não há `expiraEm`). A lógica de expiração está planejada para v1.1. Por ora, o painel mostra a data de publicação.

---

## 15. Decisões de Arquitetura (ADRs)

### ADR-001: Prisma 7 com adapter Neon

**Contexto:** Prisma 7 mudou a configuração — URLs saíram do `schema.prisma` e foram para `prisma.config.ts`. O adapter Neon substitui o driver pg padrão.

**Decisão:** Usar `@prisma/adapter-neon` no `PrismaClient` e `DIRECT_URL` sem pooler para migrations DDL.

**Consequência:** O `schema.prisma` não tem `url` nem `directUrl`. O `prisma.config.ts` não usa `earlyAccess` nem `client` (removidos na versão final da API).

---

### ADR-002: Cookie httpOnly para JWT

**Contexto:** Alternativas avaliadas: localStorage, sessionStorage, header Authorization.

**Decisão:** Cookie `httpOnly: true, sameSite: "lax"` com expiração de 7 dias.

**Consequência:** Token não é acessível via JavaScript (proteção XSS). O browser envia automaticamente em toda requisição `same-origin`. API Routes leem via `cookies()` do `next/headers`.

---

### ADR-003: Campo `tipDoc` vs `tipoDoc`

**Contexto:** O banco usa `tipDoc` (nome histórico). O JWT payload usa `tipoDoc` (nome semântico). Mantidos diferentes intencionalmente.

**Regra:** Ao criar token JWT: `tipoDoc: usuario.tipDoc as "CPF" | "CNPJ"`. Ao ler do JWT: `usuario.tipoDoc`. Ao ler do banco: `db.tipDoc`.

---

### ADR-004: Remoção da etapa "Contato" do wizard

**Contexto:** O wizard original tinha 4 etapas: Veículo → Fotos → Contato → Publicar. Os dados de contato eram preenchidos manualmente.

**Decisão:** Remover etapa Contato. Dados preenchidos automaticamente via `/api/me` no `useMe()` hook.

**Consequência:** UX mais fluida. Usuário preenche dados uma vez no cadastro. O anúncio usa sempre os dados atuais do perfil.

---

### ADR-005: Next.js 16 — proxy.ts em vez de middleware.ts

**Contexto:** Next.js 16 renomeou a convenção de middleware.

**Regra:** Arquivo deve se chamar `proxy.ts`, função exportada deve ser `proxy`. Se `middleware.ts` e `proxy.ts` coexistirem, o build falha com erro de conflito.

---

## 16. Pendências e Roadmap

### v1.1 — Prioridade Alta

- [ ] **Webhook do Stripe** — configurar `STRIPE_WEBHOOK_SECRET` em produção e testar `checkout.session.completed`
- [ ] **E-mail de confirmação** — integrar Resend para enviar recibo após pagamento e contrato em PDF
- [ ] **Contrato PDF** — gerar automaticamente com nome, CPF/CNPJ, plano, data e valor usando `@react-pdf/renderer`
- [ ] **Remoção de fotos do Blob** — ao deletar anúncio chamar `del()` do `@vercel/blob`
- [ ] **Termos de Uso** — criar página `/termos` com texto jurídico validado por advogado
- [ ] **Node 22** — atualizar para eliminar warning do `@prisma/streams-local`

### v1.2 — Prioridade Média

- [ ] **Expiração de anúncios** — adicionar campo `expiraEm` no schema e job de expiração automática
- [ ] **Edição de anúncio** — PATCH em `/api/anuncios/[id]` com campos editáveis
- [ ] **Filtros avançados** — busca por preço, ano, km, categoria na home
- [ ] **SEO** — meta tags dinâmicas em `/anuncio/[id]` com Open Graph para compartilhamento
- [ ] **PWA** — manifest.json e service worker para instalação no mobile

### v1.3 — Prioridade Baixa

- [ ] **Destaque avulso** — comprar destaque por R$19 por 7 dias sem assinar plano
- [ ] **Painel admin** — dashboard para Cotawebseguros gerenciar anúncios e usuários
- [ ] **Relatórios** — visualizações, cliques em WhatsApp, conversão por plano
- [ ] **Multi-idioma** — inglês e espanhol para compradores internacionais
- [ ] **Avaliações** — sistema de rating para anunciantes recorrentes

---

## Contatos e Responsabilidades

| Área | Responsável | Contato |
|------|------------|---------|
| Produto e negócio | Cotawebseguros | vibecarros-salto@gmail.com |
| Desenvolvimento | Strsoftware | vibecarros-salto@gmail.com |
| Infraestrutura | Vercel / Neon | dashboards respectivos |
| Pagamentos | Stripe | dashboard.stripe.com |

---

*Documento gerado em Abril de 2026 — VibeCarros v1.0.0*  
*Cotawebseguros © 2026 — Todos os direitos reservados*
