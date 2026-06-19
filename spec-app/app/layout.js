import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Spec Food Service — Otwarcie Siedziby Stawiski 2026',
  description: 'Uroczyste Otwarcie Nowej Siedziby — 28 listopada 2026',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  )
}
