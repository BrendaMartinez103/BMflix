import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-vh-100" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero / encabezado */}
      <section className="container py-4">
        <div className="d-flex justify-content-center">
          <div className="w-100" style={{ maxWidth: 1100 }}>
            <div className="position-relative rounded shadow-sm overflow-hidden" style={{ aspectRatio: '11 / 5' }}>
              <Image
                src="/encabezado.jpeg"
                alt="Rankeá tus series y películas favoritas"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 576px) 100vw, (max-width: 992px) 90vw, 1100px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Título + slogan */}
      <section className="container text-center my-4 my-md-5">
        <h1 className="fw-bold text-primary" style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3.5rem)' }}>
          BMflix
        </h1>
        <p className="text-muted-foreground mt-2" style={{ fontSize: 'clamp(1rem, 1vw + .8rem, 1.25rem)' }}>
          📺 Tu guía para elegir la próxima maratón. Donde las historias reciben tu puntaje.
        </p>

        {/* CTA / accesos rápidos */}
        <div className="d-flex gap-2 justify-content-center mt-3">
          <Link href="/peliculas" className="btn btn-primary">
            🎬 Películas
          </Link>
          <Link href="/series" className="btn btn-outline-primary">
            📺 Series
          </Link>
          <Link href="/ranking" className="btn btn-outline-primary">
            ⭐ Ranking
          </Link>
        </div>
      </section>
    </main>
  )
}
