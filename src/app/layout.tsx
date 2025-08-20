
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import type React from 'react'
import type { Metadata } from 'next'
import OffcanvasNavbar from './components/offcanvas'

export const metadata = {
  metadataBase: new URL('https://bmflix.vercel.app'),
  title: 'BMflix',
  description: 'App con Bootstrap y Next.js',
  openGraph: {
    images: [
      {
        url: URL + '/logo.png',
        width: 800,
        height: 600,
      },
      {
        url: URL + '/logo.png',
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'es_AR',
    type: 'website',
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
