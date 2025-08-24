import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { rateContent } from '@/app/actions/rating';
import Pagination from '@/app/components/Pagination';
import { FilterSelect } from '../components/FiltroGenero';

type PageProps = {
  searchParams: Promise<{ page?: string; genero?: string }>;
};

export default async function SeriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? '1') || 1);
  const generoSeleccionado = (params.genero ?? '').toString();
  const pageSize = 18;

  const where: any = { category: 'SERIES' };
  if (generoSeleccionado) {
    where.series = { genres: { some: { name: generoSeleccionado } } };
  }

  const [total, visibles] = await Promise.all([
    prisma.content.count({ where }),
    prisma.content.findMany({
      where,
      include: {
        originalLanguage: true,
        series: { include: { genres: true } },
      },
      orderBy: { updatedAt: 'desc' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const generosUnicos = Array.from(
    new Set(
      visibles.flatMap((c) => c.series?.genres?.map((g) => g.name) ?? [])
    )
  ).sort();

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
        {visibles.map((c) => {
          const href = c.series ? `/series/${c.series.id}` : '#';
          const title = c.name || c.series?.name || 'Serie';
          const poster = c.posterUrl || '/logo.png';
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

      <Pagination
        basePath="/series"
        currentPage={page}
        totalPages={totalPages}
        extraParams={generoSeleccionado ? { genero: generoSeleccionado } : undefined}
      />
    </main>
  );
}
