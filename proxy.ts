import { NextRequest, NextResponse } from "next/server"

const PAGINAS_RASTREADAS = ["/", "/anunciar", "/planos", "/login", "/registro", "/painel", "/admin"]
const rotasProtegidas = ["/anunciar", "/dashboard", "/perfil"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Registra acesso nas páginas rastreadas
  const rastrear = PAGINAS_RASTREADAS.includes(pathname) || pathname.startsWith("/anuncio/")
  if (rastrear) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido"
    fetch(`${request.nextUrl.origin}/api/acesso`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pagina: pathname, ip }),
    }).catch(() => {})
  }

  // Proteção de rotas autenticadas
  const precisaAuth = rotasProtegidas.some((rota) => pathname.startsWith(rota))
  if (precisaAuth) {
    const token = request.cookies.get("token")?.value
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
}
