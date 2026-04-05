import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const rotasProtegidas = ["/anunciar", "/dashboard", "/perfil"]
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
  matcher: ["/anunciar/:path*", "/dashboard/:path*", "/perfil/:path*"],
}
