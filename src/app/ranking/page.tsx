import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Ranking',
  description: 'Top 10 de BMflix por puntaje',
}

function getItemBasics(c: {
  id: number
  category: 'MOVIE' | 'SERIES'
  name: string | null
  posterUrl: string | null
  rating: number | null
  originalLanguage: { code: string } | null
  series?: { id: number; name: string | null } | null
  movie?: { id: number; name: string | null } | null
}) {
  const isSeries = c.category === 'SERIES'
  const href =
    isSeries && c.series
      ? `/series/${c.series.id}`
      : !isSeries && c.movie
      ? `/peliculas/${c.movie.id}`
      : '#'

  const title = c.name || c.series?.name || c.movie?.name || 'Contenido'

 
  const poster = c.posterUrl || '/logo.png'

  const lang = c.originalLanguage?.code?.toUpperCase() || ''
  const ratingNum = c.rating != null ? Number(c.rating) : null
  const categoryBadge = isSeries ? 'Serie' : 'Película'
  return { href, title, poster, lang, ratingNum, categoryBadge }
}

async function getTopAll() {
  return prisma.content.findMany({
    where: { rating: { not: null } },
    select: {
      id: true,
      category: true,
      name: true,
      posterUrl: true,
      rating: true,
      originalLanguage: { select: { code: true } },
      series: { select: { id: true, name: true } },
      movie: { select: { id: true, name: true } },
    },
    orderBy: [{ rating: 'desc' }, { updatedAt: 'desc' }],
    take: 10,
  })
}

async function getTopByCategory(category: 'SERIES' | 'MOVIE') {
  return prisma.content.findMany({
    where: { category, rating: { not: null } },
    select: {
      id: true,
      category: true,
      name: true,
      posterUrl: true,
      rating: true,
      originalLanguage: { select: { code: true } },
      series: { select: { id: true, name: true } },
      movie: { select: { id: true, name: true } },
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

  const Card = ({ c, pos }: { c: any; pos: number }) => {
    const { href, title, poster, lang, ratingNum, categoryBadge } = getItemBasics(c)
    return (
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div className="card h-100 bg-surface border-primary-soft rank-card">
          <Link href={href} className="text-decoration-none">
            <div
              className="rank-poster position-relative w-100"
              style={{ aspectRatio: '2 / 3' }}
            >
              <Image
                src={poster}
                alt={title}
                fill
                className="object-cover rounded-top"
                sizes="(max-width: 576px) 50vw, (max-width: 992px) 25vw, 16vw"
                priority={pos <= 3}
              />
              <span
                className="position-absolute top-0 start-0 m-2 badge"
                style={{ backgroundColor: 'var(--primary)', color: '#000' }}
              >
                {categoryBadge}
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
              {ratingNum != null ? `⭐ ${ratingNum.toFixed(1)}` : '⭐ —'}
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
      <div className="row g-3">
        {items.map((c, i) => (
          <Card key={c.id} c={c} pos={i + 1} />
        ))}
      </div>
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
