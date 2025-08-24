import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata } from 'next'
import type React from 'react'
import OffcanvasNavbar from './components/offcanvas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bmflix.vercel.app'
const V = 'v=4'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BMflix',
    template: '%s • BMflix',
  },
  description: 'Tu guía para elegir películas y series',
  openGraph: {
    title: 'BMflix',
    description: 'Tu guía para elegir películas y series',
    url: '/',
    siteName: 'BMflix',
    locale: 'es_AR',
    type: 'website',
    images: [
      { url: `/og-image.png?${V}`, width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMflix',
    description: 'Tu guía para elegir películas y series',
    images: [`/og-image.png?${V}`],
  },
  icons: {
    // Next resuelve relativo a /public usando metadataBase
    icon: [
      { url: `/favicon.ico?${V}` },
      { url: `/logo.png?${V}`, type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: `/logo.png?${V}`, sizes: '180x180', type: 'image/png' }],
    shortcut: [`/favicon.ico?${V}`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href={`/favicon.ico?${V}`} />
        <link rel="apple-touch-icon" href={`/og-image.png?${V}`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png?${V}`} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png?${V}`} />
      </head>
      <body>
        <OffcanvasNavbar brandName="BMflix" brandHref="/" />
        {children}
      </body>
    </html>
  )
}
