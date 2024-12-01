import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sorteio | Império Doce',
  description: 'Sorteio | Império Doce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}