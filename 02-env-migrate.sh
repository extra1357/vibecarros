#!/bin/bash
# ─── VibeCarros — Script 02: .env + Migration ────────────────────────────────
# Execute em: ~/vibecarros/vibecarros
# Comando: bash ~/Downloads/02-env-migrate.sh
# ⚠️  Substitua a DATABASE_URL pela sua URL do Neon antes de rodar!

set -e

echo "📝 Criando .env..."
cat > .env << 'EOF'
# Cole aqui a URL do seu banco Neon (postgresql://...)
DATABASE_URL="postgresql://usuario:senha@host/vibecarros?sslmode=require"

# Gere um segredo forte: rode no terminal -> openssl rand -base64 32
JWT_SECRET="troque_por_um_segredo_forte_aqui"

# Tempo de expiração do token JWT
JWT_EXPIRES_IN="7d"
EOF

echo "✅ .env criado!"
echo ""
echo "⚠️  IMPORTANTE: Edite o .env agora com sua DATABASE_URL real do Neon."
echo "   Acesse: https://console.neon.tech → seu projeto → Connection string"
echo ""
read -p "Pressione ENTER após editar o .env para continuar com a migration..."

echo "🔄 Rodando migration..."
npx prisma migrate dev --name init

echo "✅ Banco criado com sucesso!"
echo "👉 Próximo passo: bash 03-lib-auth.sh"
