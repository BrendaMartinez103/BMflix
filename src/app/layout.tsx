
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import type React from 'react'
import OffcanvasNavbar from './components/offcanvas'

export const metadata = {
  metadataBase: new URL('https://bmflix.vercel.app'),
  title: 'BMflix',
  description: 'App con Bootstrap y Next.js',
  openGraph: {
    title: 'BMflix',
    description: '📺 Tu guía para elegir la próxima maratón.',
    url: 'https://tusitio.vercel.app',
    siteName: 'BMflix',
    images: [
      {
        url: '/og-image.png', // 👈 tu logo o imagen de preview
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
   icons: {
    icon: '/favicon.ico',  
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
