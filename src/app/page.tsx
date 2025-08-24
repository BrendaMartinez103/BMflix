import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-vh-100" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero / encabezado */}
      <section className="container py-4">
        <div className="d-flex justify-content-center">
          <div className="w-100" style={{ maxWidth: 1100 }}>
            <div
              className="position-relative rounded shadow-sm overflow-hidden"
              style={{ aspectRatio: '11 / 5' }}
            >
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
        <h1
          className="fw-bold text-primary"
          style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 3.5rem)' }}
        >
          BMflix
        </h1>
        <p
          className="text-muted-foreground mt-2"
          style={{ fontSize: 'clamp(1rem, 1vw + .8rem, 1.25rem)' }}
        >
          📺 Tu guía para elegir la próxima maratón. Donde las historias reciben tu puntaje.
        </p>

        {/* CTA / accesos rápidos */}
        <div className="d-flex gap-2 justify-content-center mt-3">
          <Link href="/peliculas" className="btn btn-outline-primary">
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

      {/* Bio / Sobre mí */}
      <section className="container mb-5">
        <div
          className="card border-primary-soft shadow-sm mx-auto"
          style={{ maxWidth: 920 }}
        >
          <div className="card-body p-3 p-md-4">
            <div className="d-flex gap-3 align-items-start">
              <div></div>
                <Image
                  src="/avatar-bm.png"     
                  alt="Avatar BM"
                  width={64}
                  height={64}
                  className="rounded-circle border border-primary-soft flex-shrink-0 d-none d-sm-inline-block object-cover"
                />
                <div>
                <h5 className="text-primary mb-2">¡Hola! Soy BM 👋</h5>
                <p className="mb-3 text-muted-foreground" style={{ lineHeight: 1.6 }}>
                   Mi hobbie es ver películas y series, y al mismo tiempo disfruto mucho de programar y crear proyectos. 
                   Por eso decidí unir ambas cosas en este espacio: un proyecto independiente donde aplico lo que aprendo en mi carrera de Ingeniería en Sistemas de Información, 
                   mientras comparto todo lo que veo, con mi apreciación y puntaje. 
                   Unite sumando tu calificación en el contenido que viste.
                </p>
                <p className="mb-3 text-muted-foreground" style={{ lineHeight: 1.6 }}>
                  Mi top de industria es:
                </p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span
                    className="badge"
                    style={{ backgroundColor: 'var(--primary)', color: '#0dcaf0' }}
                  >
                    #1 Cine Asiático
                  </span>
                  <span
                    className="badge"
                    style={{ backgroundColor: 'var(--primary)', color: '#0dcaf0' }}
                  >
                    #2 Cine de España
                  </span>
                  <span
                    className="badge"
                    style={{ backgroundColor: 'var(--primary)', color: '#0dcaf0' }}
                  >
                    #3 Cine de EE.UU.
                  </span>
                </div>
                <p className="mb-3 text-muted-foreground" style={{ lineHeight: 1.6 }}>
                  ¿Por qué ese orden? Porque, en promedio, de cada 10 títulos asiáticos 9
                  me gustan mucho; de España ~8, y de EE.UU. ~6. Igual, nadie le saca el trono a
                  clásicos insuperables como <strong>Breaking Bad</strong> 
                </p>
                <p className="mb-3 text-muted-foreground" style={{ lineHeight: 1.6 }}>
                    Te invito a explorar lo que vi y recomiendo en las secciones de{' '}
                    <Link href="/series" className="text-primary">Series</Link>,{' '}
                    <Link href="/peliculas" className="text-primary">Películas</Link> y{' '}
                    <Link href="/peliculas-series" className="text-primary">Todo el contenido</Link>.
                  </p>
                  <p className="mb-4 text-muted-foreground" style={{ lineHeight: 1.6 }}>
                    Si no sabés qué mirar, visitá el{' '}
                    <Link href="/ranking" className="text-primary">Ranking</Link> para ver lo mejor puntuado,
                    o sorprendete con la pestaña de{' '}
                    <Link href="/recomendaciones" className="text-primary">Recomendaciones</Link>.
                    ¡Que lo disfruten, amigos cinéfilos!
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
