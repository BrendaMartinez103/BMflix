import type { Metadata } from 'next'
import OffcanvasNavbar from './components/offcanvas'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

const SITE_URL = 'https://bmflix.vercel.app'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body>
        <OffcanvasNavbar brandName="BMflix" brandHref="/" />
        {children}
      </body>
    </html>
  )
}
