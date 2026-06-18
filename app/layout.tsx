import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LMVK Group — Private Venture Group',
    template: '%s — LMVK Group',
  },
  description:
    'LMVK Group is a private venture group creating premium projects across hospitality, technology, commerce and lifestyle. Building brands with taste, discipline and long-term vision.',
  applicationName: 'LMVK Group',
  generator: 'v0.app',
  keywords: [
    'LMVK Group',
    'private holding',
    'venture group',
    'hospitality',
    'Golden Lama Coffee',
    'premium brands',
  ],
  authors: [{ name: 'LMVK Group' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LMVK Group — Private Venture Group',
    description:
      'Building brands with taste, discipline and long-term vision across hospitality, technology, commerce and lifestyle.',
    type: 'website',
    siteName: 'LMVK Group',
    locale: 'en_US',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LMVK Group — Private Venture Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LMVK Group — Private Venture Group',
    description:
      'Building brands with taste, discipline and long-term vision across hospitality, technology, commerce and lifestyle.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f4ec',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${cormorant.variable} ${inter.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
