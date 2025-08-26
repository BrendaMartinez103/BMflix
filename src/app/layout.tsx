import OffcanvasNavbar from './components/offcanvas'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import type { Metadata, Viewport } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bmflix.vercel.app'
const V = 'v=6'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'BMflix',
  description: 'Tu guía para elegir películas y series',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'BMflix',
    description: 'Tu guía para elegir películas y series',
    url: SITE_URL,
    siteName: 'BMflix',
    type: 'website',
    images: [
      {
        url: `/og-image.png?${V}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMflix',
    description: 'Tu guía para elegir películas y series',
    images: [`/og-image.png?${V}`],
  },
}
export const viewport: Viewport = { themeColor: '#000000' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href={`/favicon.ico?${V}`} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-32x32.png?${V}`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-16x16.png?${V}`} />
        <link rel="apple-touch-icon" href={`/apple-touch-icon.png?${V}`} />
         {/* manifest PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* iOS standalone mejorado */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body>
        <OffcanvasNavbar
          brandName="BMflix"
          brandHref="/"
        />
      {children}
      </body>
    </html>
  )
}

