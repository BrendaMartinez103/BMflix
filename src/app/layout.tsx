// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import type React from 'react'
import type { Metadata } from 'next'
import OffcanvasNavbar from './components/offcanvas'

export const metadata = {
  title: 'BMflix',
  description: 'App con Bootstrap y Next.js',
  openGraph: {
    images: [
      {
        url: URL + '/icon.png',
        width: 800,
        height: 600,
      },
      {
        url: URL + '/icon.png',
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  icons: {
    shortcut: URL + '/favicon.ico',
    apple: URL + '/favicon-32x32.png',
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
