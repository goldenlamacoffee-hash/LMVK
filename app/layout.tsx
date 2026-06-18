import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { getLocale, localeConfig } from '@/lib/i18n'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
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
  themeColor: '#f6f3ee',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={localeConfig[locale].htmlLang}
      className={`light ${playfair.variable} ${montserrat.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
