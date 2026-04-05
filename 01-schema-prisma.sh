#!/bin/bash
# ─── VibeCarros — Script 01: Schema Prisma ───────────────────────────────────
# Execute em: ~/vibecarros/vibecarros
# Comando: bash ~/Downloads/01-schema-prisma.sh

set -e
echo "📦 Instalando dependências..."
npm install prisma @prisma/client bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

echo "⚙️  Inicializando Prisma..."
npx prisma init --datasource-provider postgresql

echo "📝 Criando schema.prisma..."
cat > prisma/schema.prisma << 'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id         String    @id @default(cuid())
  nome       String
  email      String    @unique
  senha      String
  documento  String    @unique   // CPF ou CNPJ (só números)
  tipoDoc    TipoDoc               // CPF | CNPJ
  whatsapp   String
  cidade     String
  estado     String
  planType   String    @default("free")   // free | premium | master
  criadoEm  DateTime  @default(now())
  anuncios   Anuncio[]

  @@map("usuarios")
}

model Anuncio {
  id            String        @id @default(cuid())
  usuarioId     String
  usuario       Usuario       @relation(fields: [usuarioId], references: [id], onDelete: Cascade)

  // Dados do veículo
  categoria     String
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
  blindado      Boolean       @default(false)
  financiamento Boolean       @default(false)
  troca         Boolean       @default(false)
  preco         Int           // em centavos
  fipe          Int?          // em centavos
  placa         String?
  descricao     String?

  // Fotos
  fotos         Foto[]

  // Status e ciclo de vida
  status        StatusAnuncio @default(ATIVO)
  expiresAt     DateTime
  renovadoEm   DateTime?

  // Monetização futura
  isFeatured    Boolean       @default(false)

  criadoEm     DateTime      @default(now())
  atualizadoEm DateTime      @updatedAt

  @@map("anuncios")
}

model Foto {
  id        String  @id @default(cuid())
  anuncioId String
  anuncio   Anuncio @relation(fields: [anuncioId], references: [id], onDelete: Cascade)
  url       String
  ordem     Int     @default(0)

  @@map("fotos")
}

enum TipoDoc {
  CPF
  CNPJ
}

enum StatusAnuncio {
  ATIVO
  INATIVO
  VENDIDO
}
EOF

echo ""
echo "✅ Schema criado! Agora:"
echo "1. Configure o DATABASE_URL no arquivo .env"
echo "2. Rode o script 02-env-migrate.sh"
