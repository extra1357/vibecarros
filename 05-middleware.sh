#!/bin/bash
# ─── VibeCarros — Script 05: Middleware JWT ───────────────────────────────────
# Execute em: ~/vibecarros/vibecarros
# Comando: bash ~/Downloads/05-middleware.sh

set -e

cat > middleware.ts << 'EOF'
import { NextRequest, NextResponse } from "next/server"
import { verificarToken } from "@/lib/auth"

// Rotas que exigem login
const ROTAS_PROTEGIDAS = ["/painel", "/anunciar/publicar"]

// Rotas que NÃO podem ser acessadas logado (login/registro)
const ROTAS_PUBLICAS_ONLY = ["/login", "/registro"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get("token")?.value

  let usuarioLogado = false
  if (token) {
    try {
      verificarToken(token)
      usuarioLogado = true
    } catch {
      usuarioLogado = false
    }
  }

  // Redireciona para login se tentar acessar rota protegida sem token
  const precisaLogin = ROTAS_PROTEGIDAS.some((r) => pathname.startsWith(r))
  if (precisaLogin && !usuarioLogado) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  // Redireciona para painel se já estiver logado e tentar acessar login/registro
  const soPublica = ROTAS_PUBLICAS_ONLY.some((r) => pathname.startsWith(r))
  if (soPublica && usuarioLogado) {
    const url = req.nextUrl.clone()
    url.pathname = "/painel"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/painel/:path*", "/anunciar/:path*", "/login", "/registro"],
}
EOF

echo "✅ middleware.ts criado!"
echo ""
echo "👉 Próximo passo: bash 06-paginas-auth.sh"
