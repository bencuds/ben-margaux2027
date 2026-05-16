import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ben & Margaux | 4–11 April 2027',
  description:
    'Join us as we celebrate our marriage in the Philippines — Tagaytay & Siargao, 4–11 April 2027. #BenAndMargaux2027',
  openGraph: {
    title: 'Ben & Margaux | 4–11 April 2027',
    description: 'Celebrating our marriage in the Philippines. Tagaytay & Siargao, April 2027.',
    type: 'website',
    siteName: 'Ben & Margaux',
    images: [
      {
        url: '/images/tagaytay-bg.webp',
        width: 1200,
        height: 630,
        alt: 'Taal Lake, Tagaytay — Ben & Margaux April 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ben & Margaux | 4–11 April 2027',
    description: 'Celebrating our marriage in the Philippines. Tagaytay & Siargao, April 2027.',
    images: ['/images/tagaytay-bg.webp'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans bg-sandy text-jungle antialiased">
        {children}
      </body>
    </html>
  )
}
