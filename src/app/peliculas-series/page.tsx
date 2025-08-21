import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Pagination from '@/app/components/Pagination';
import { rateContent } from '@/app/actions/rating';

export const metadata = {
  title: 'Películas & Series',
  description: 'Explorá todo el contenido de BMflix',
};

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PeliculasSeriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? '1') || 1);
  const pageSize = 18;

  const [total, feed] = await Promise.all([
    prisma.content.count(),
    prisma.content.findMany({
      include: { series: true, movie: true, originalLanguage: true },
      orderBy: { updatedAt: 'desc' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <main className="container py-5">
      {/* Header + botones */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0 text-primary">Explorá contenido</h2>
        <div className="btn-group">
          <Link href="/peliculas" className="btn btn-primary">🎬 Películas</Link>
          <Link href="/series" className="btn btn-outline-primary">📺 Series</Link>
        </div>
      </div>

      {/* grid de cards */}
      <div className="row g-3">
        {feed.map((c) => {
          const href =
            c.category === 'SERIES' && c.series
              ? `/series/${c.series.id}`
              : c.category === 'MOVIE' && c.movie
              ? `/peliculas/${c.movie.id}`
              : '#';

          const title = c.name || c.series?.name || c.movie?.name || 'Contenido';
          const poster = c.posterUrl || '/logo.png';
          const badge = c.category === 'SERIES' ? 'Serie' : 'Película';
          const lang = c.originalLanguage?.code?.toUpperCase();

          return (
            <div key={c.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="card h-100 bg-surface border-primary-soft">
                <Link href={href} className="text-decoration-none">
                  <div className="position-relative w-100" style={{ aspectRatio: '3 / 3' }}>
                    <Image
                      src={poster}
                      alt={title}
                      fill
                      className="object-cover rounded-top"
                      sizes="(max-width: 768px) 50vw, 20vw"
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

                  <small className="text-muted-foreground d-block mb-2">
                    {c.rating != null ? `⭐ ${Number(c.rating).toFixed(1)}` : '⭐ —'}
                    {lang ? ` · ${lang}` : ''}
                  </small>

                  <form action={rateContent} className="input-group input-group-sm">
                    <input type="hidden" name="id" value={c.id} />
                    <input
                      name="rating"
                      type="number"
                      min={0}
                      max={10}
                      step="any"
                      defaultValue={c.rating != null ? Number(c.rating) : undefined}
                      placeholder="0–10"
                      inputMode="decimal"
                      className="form-control form-control-sm bg-dark text-light border-primary"
                      aria-label="Puntaje"
                    />
                    <button type="submit" className="btn btn-primary">Puntuar</button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        basePath="/peliculas-series" 
        currentPage={page}
        totalPages={totalPages}
      />
    </main>
  );
}
