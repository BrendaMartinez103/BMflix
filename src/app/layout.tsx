// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // si tenés tu CSS propio

export const metadata = {
  title: 'BMflix',
  description: 'App con Bootstrap y Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

