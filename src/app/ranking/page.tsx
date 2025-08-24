import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Ranking',
  description: 'Top 10 de BMflix por puntaje',
}

function getItemBasics(c: any) {
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
  const ratingNum = typeof c.rating === 'object' ? Number(c.rating) : c.rating 
  const categoryBadge = isSeries ? 'Serie' : 'Película'
  return { href, title, poster, lang, ratingNum, categoryBadge }
}

async function getTopAll() {
  return prisma.content.findMany({
    where: {
      rating: { not: null },
    },
    include: {
      series: true,
      movie: true,
      originalLanguage: true,
    },
    orderBy: [{ rating: 'desc' }, { updatedAt: 'desc' }],
    take: 10,
  })
}

async function getTopByCategory(category: 'SERIES' | 'MOVIE') {
  return prisma.content.findMany({
    where: {
      category,
      rating: { not: null },
    },
    include: {
      series: true,
      movie: true,
      originalLanguage: true,
    },
    orderBy: [{ rating: 'desc' }, { updatedAt: 'desc' }],
    take: 10,
  })
}

export default async function RankingPage() {
  const [topAll, topSeries, topMovies] = await Promise.all([
    getTopAll(),
    getTopByCategory('SERIES'),
    getTopByCategory('MOVIE'),
  ])

  const Medal = ({ pos }: { pos: number }) => {
    const emoji = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `#${pos}`
    return (
      <span
        className="badge"
        style={{
          backgroundColor: 'var(--primary)',
          color: '#000',
        }}
      >
        {emoji}
      </span>
    )
  }

  const Card = ({ c, pos }: { c: any; pos: number }) => {
    const { href, title, poster, lang, ratingNum, categoryBadge } = getItemBasics(c)
    return (
      <div className="col-6 col-sm-4 col-md-3 col-lg-2"> 
        <div className="card h-100 bg-surface border-primary-soft rank-card">
          <Link href={href} className="text-decoration-none">
            <div className="rank-poster position-relative w-100">
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
                {categoryBadge}
              </span>
              <span className="position-absolute top-0 end-0 m-2">
                <Medal pos={pos} />
              </span>
            </div>
          </Link>

          <div className="card-body py-2">
            <h6 className="card-title m-0 text-truncate rank-title">
              <Link href={href} className="text-primary text-decoration-none">
                {title}
              </Link>
            </h6>

            <small className="text-muted-foreground d-block">
              {ratingNum != null ? `⭐ ${Number(ratingNum).toFixed(1)}` : '⭐ —'}
              {lang ? ` · ${lang}` : ''}
            </small>
          </div>
        </div>
      </div>
    )
  }
  const Grid = ({ title, items }: { title: string; items: any[] }) => (
    <section className="mb-5">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0 text-primary">{title}</h2>
      </div>
      {items.length === 0 ? (
        <p className="text-muted">No hay datos suficientes aún.</p>
      ) : (
        <div className="row g-3">
          {items.map((c, i) => (
            <Card key={c.id} c={c} pos={i + 1} />
          ))}
        </div>
      )}
    </section>
  )

  return (
    <main className="container py-5">
      <Grid title="Top 10 global" items={topAll} />
      <Grid title="Top 10 Series" items={topSeries} />
      <Grid title="Top 10 Películas" items={topMovies} />
    </main>
  )
}
