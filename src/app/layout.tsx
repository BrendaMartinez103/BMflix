
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import type React from 'react'
import OffcanvasNavbar from './components/offcanvas'

export const metadata = {
  metadataBase: new URL('https://bmflix.vercel.app'),
  title: 'BMflix',
  description: 'Tu guía para elegir películas y series',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'BMflix',
    description: '📺 Tu guía para elegir la próxima maratón.',
    url: 'https://bmflix.vercel.app',
    siteName: 'BMflix',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMflix',
    description: '📺 Tu guía para elegir la próxima maratón.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="es">
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
