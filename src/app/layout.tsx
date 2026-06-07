import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bidhanshi Unisex Salon | Best Salon in Nepalgunj',
  description: 'Experience premium hair styling, professional makeup, advanced slimming treatments, and beauty courses at Bidhanshi Unisex Salon Nepalgunj.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-blush text-salonDark font-sans">
        {children}
      </body>
    </html>
  )
}
