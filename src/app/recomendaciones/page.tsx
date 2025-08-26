import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Recomendaciones',
  description: 'Mis recomendaciones (BM): top por mi nota original',
}

function Card({ c, pos }: { c: any; pos: number }) {
  const isSeries = c.category === 'SERIES'
  const href =
    isSeries && c.series
      ? `/series/${c.series.id}`
      : !isSeries && c.movie
      ? `/peliculas/${c.movie.id}`
      : '#'

  const title = c.name || c.series?.name || c.movie?.name || 'Contenido'
  const poster = c.posterUrl?.startsWith('/') ? c.posterUrl : '/logo.png'
  const lang = c.originalLanguage?.code?.toUpperCase() || ''
  const bmScore = isSeries ? c.series?.rating : c.movie?.rating
  const badge = isSeries ? 'Serie' : 'Película'

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div className="card h-100 bg-surface border-primary-soft rank-card">
        <Link href={href} className="text-decoration-none">
          <div className="rank-poster position-relative w-100" style={{ aspectRatio: '2 / 3' }}>
            <Image
              src={poster}
              alt={title}
              fill
              className="object-cover rounded-top"
              sizes="(max-width: 576px) 50vw, (max-width: 992px) 25vw, 16vw"
            />
            <span
              className="position-absolute top-0 start-0 m-2 badge"
              style={{ backgroundColor: 'var(--primary)', color: '#000' }}
            >
              {badge}
            </span>
          </div>
        </Link>

        <div className="card-body py-2">
          <h6 className="card-title m-0 text-truncate">
            <Link href={href} className="text-primary text-decoration-none">
              {title}
            </Link>
          </h6>
          <small className="text-muted-foreground d-block">
            {bmScore != null ? `⭐ ${Number(bmScore).toFixed(1)}` : '⭐ —'}
            {lang ? ` · ${lang}` : ''}
          </small>
        </div>
      </div>
    </div>
  )
}

function Grid({ title, items }: { title: string; items: any[] }) {
  return (
    <section className="mb-5">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0 text-primary">{title}</h2>
      </div>
        <div className="row g-3">
          {items.map((c, i) => (
            <Card key={c.id} c={c} pos={i + 1} />
          ))}
        </div>
    </section>
  )
}

export default async function RecomendacionesPage() {
  // TOP por mi nota original (no el promedio):
  // series: series.rating
  // películas: movie.rating
  const [topSeriesBM, topMoviesBM] = await Promise.all([
    prisma.content.findMany({
      where: { category: 'SERIES', series: { rating: { not: null } } },
      include: { series: true, movie: true, originalLanguage: true },
      orderBy: [{ series: { rating: 'desc' } }, { updatedAt: 'desc' }],
      take: 12,
    }),
    prisma.content.findMany({
      where: { category: 'MOVIE', movie: { rating: { not: null } } },
      include: { series: true, movie: true, originalLanguage: true },
      orderBy: [{ movie: { rating: 'desc' } }, { updatedAt: 'desc' }],
      take: 12,
    }),
  ])

  return (
    <main className="container py-5">
      <div className="mb-4">
        <h1 className="m-0 text-primary">Mis recomendaciones</h1>
         <p className="mb-3 text-muted-foreground" style={{ lineHeight: 1.6 }}>
          Este ranking usa <strong>mi opinion y puntuacion personal</strong>, Para ver el top de la gente dirigirse a la pestaña de ranking.
        </p>
      </div>
      <Grid title="Series recomendadas por BM" items={topSeriesBM} />
      <Grid title="Películas recomendadas por BM" items={topMoviesBM} />
    </main>
  )
}
