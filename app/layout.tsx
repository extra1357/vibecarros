import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "VibeCarros - Compre e Venda seu Veiculo",
  description: "Marketplace de veiculos com comparacao automatica da Tabela FIPE.",
  verification: {
    google: "Lma7EE9bQ8OaImp3CeVkip0AZhHY94UIK3J_zzsUW8Q",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}