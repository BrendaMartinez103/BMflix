import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { rateContent } from '@/app/actions/rating';
import { FilterSelect } from '../components/FiltroGenero';

export const metadata = {
  title: 'Series',
  description: 'Explorá todas las series en BMflix',
};

type PageProps = {
  searchParams?: { genero?: string };
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default async function SeriesPage({ searchParams }: PageProps) {
  const generoSeleccionado = searchParams?.genero?.toString() ?? '';

  const items = await prisma.content.findMany({
    where: { category: 'SERIES' },
    include: {
      originalLanguage: true,
      series: { include: { genres: true } }, 
    },
    orderBy: { updatedAt: 'desc' },
  });

  const feed = shuffle(items);

  // Géneros únicos a partir de series.genres
  const generosUnicos = Array.from(
    new Set(feed.flatMap((c) => c.series?.genres?.map((g) => g.name) ?? []))
  ).sort();

  // Aplica filtro si hay género seleccionado
  const feedFiltrado = generoSeleccionado
    ? feed.filter((c) => c.series?.genres?.some((g) => g.name === generoSeleccionado))
    : feed;

  return (
    <main className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0 text-primary">Series</h2>

        <FilterSelect
          label="Filtrar por género:"
          options={generosUnicos}
          value={generoSeleccionado}
          basePath="/series"              
          paramName="genero"
          className="ms-3"
        />
      </div>

      <div className="row g-3">
        {feedFiltrado.map((c) => {
          const href = c.series ? `/series/${c.series.id}` : '#';
          const title = c.name || c.series?.name || 'Serie';
          const poster = c.posterUrl || '/logo.png';
          const lang = c.originalLanguage?.code?.toUpperCase();

          return (
            <div key={c.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="card h-100 bg-surface border-primary-soft">
                <Link href={href} className="text-decoration-none">
                  <div
                    className="position-relative w-100"
                    style={{ aspectRatio: '3 / 3' }}
                  >
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
                      Serie
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
    </main>
  );
}
