import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import BackButton from '@/app/components/BackButton'

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ id: string }>

}) {

  const { id } = await params
  const seriesId = Number(id)

  const serie = await prisma.series.findUnique({
    where: { id: seriesId },
    include: {
      originalLanguage: true,
      seasons: { orderBy: { number: 'asc' } },
      content: true,
      genres: true,
    },
  })

  if (!serie) {
    return (
      <main className="container py-5">
        <h1 className="text-danger">Serie no encontrada</h1>
        <Link href="/series" className="btn btn-primary mt-3">Volver</Link>
      </main>
    )
  }

  const poster =
    (serie.posterUrl && serie.posterUrl.startsWith('/')) ? serie.posterUrl
    : (serie.content?.posterUrl && serie.content.posterUrl.startsWith('/')) ? serie.content.posterUrl
    : '/logo.png'

  const ratingNumber = serie.rating != null ? Number(serie.rating) : null
  const communityScore = serie.content?.rating ?? null
  const lang = serie.originalLanguage
    ? `${serie.originalLanguage.name} (${serie.originalLanguage.code.toUpperCase()})`
    : '—'

  const totalSeasons = typeof serie.totalSeasons === 'number'
    ? serie.totalSeasons
    : serie.seasons.length

  const totalEpisodes = typeof serie.totalEpisodes === 'number'
    ? serie.totalEpisodes
    : serie.seasons.reduce((acc, s) => acc + (s.episodesCount ?? 0), 0)

  const genreNames = serie.genres.map(g => g.name)

  return (
    <main className="container py-5">
      {/* FILA PRINCIPAL */}
      <div className="row g-4">
        {/* Col izquierda: Poster + info abajo */}
        <div className="col-md-4">
          <div className="mb-3">
            <Image
              src={poster}
              alt={serie.name}
              width={340}     
              height={200}
              className="img-fluid rounded shadow w-100"
              style={{ height: 'auto' }}
            />
          </div>

          {/* Info debajo del poster */}
          <div className="mt-3">
            <p className="mb-1">
              <strong>Idioma original:</strong> {lang}
            </p>
            <p className="mb-1">
                <strong>Puntaje BM:</strong>{' '}
                {ratingNumber != null ? (
                  <span style={{ color: '#0dcaf0' }}>★</span>
                ) : (
                  '★ —'
                )}{' '}
                {ratingNumber?.toFixed(1)} / 10
            </p>
              <p className="mb-1">
                <strong>Puntaje Comunidad:</strong>{' '}
                {communityScore != null ? (
                  <span style={{ color: 'gold' }}>★</span>
                ) : (
                  '★ —'
                )}{' '}
                {communityScore?.toFixed(1)} / 10
              </p>
            {genreNames.length > 0 && (
              <p className="mb-1">
                <strong>Géneros:</strong> {genreNames.join(' · ')}
              </p>
            )}
            {serie.director && (
              <p className="mb-1"><strong>Creada por :</strong> {serie.director}</p>
            )}
            {Array.isArray(serie.protagonists) && serie.protagonists.length > 0 && (
              <p className="mb-1">
                <strong>Protagonistas:</strong> {serie.protagonists.join(', ')}
              </p>
            )}
            <p className="mb-0">
              <strong>Temporadas:</strong> {totalSeasons} &nbsp;·&nbsp;
              <strong>Episodios:</strong> {totalEpisodes}
            </p>
          </div>
        </div>

        {/* Col derecha: Título + años + descripción */}
        <div className="col-md-8">
          <h1 className="mb-2 text-primary">{serie.name}</h1>
          <p className="text-muted mb-4">
            {serie.startYear} {serie.endYear ? `– ${serie.endYear}` : '– Presente'}
          </p>

          <p className="lead">
            {serie.description}
          </p>
        </div>
      </div>

      {/* TEMPORADAS */}
      <div className="mt-5">
        <h2 className="text-primary">Temporadas</h2>

        {serie.seasons.length > 0 ? (
          <div className="card bg-surface border-primary-soft mt-3">
            <ul className="list-group list-group-flush">
              {serie.seasons.map((season) => (
                <li
                  key={season.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    background: 'transparent',
                    color: 'var(--foreground)',
                    borderColor: 'rgba(0, 188, 255, 0.2)',
                  }}
                >
                  <span>
                    <strong>Temporada {season.number}</strong>
                    {season.year ? ` (${season.year})` : ''}
                  </span>

                  {/* Episodios */}
                  <span
                    className="badge rounded-pill"
                    style={{
                      background: 'transparent',
                      color: 'var(--primary)',
                      border: '1px solid var(--primary)',
                    }}
                  >
                    {season.episodesCount} episodios
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-muted">No hay temporadas registradas.</p>
        )}
      </div>

      {/* COMENTARIO BM */}
      {serie.comentarioBM && (
        <blockquote
          className="blockquote mt-4 p-4 rounded"
          style={{
            borderLeft: '4px solid var(--primary)',
            background: 'rgba(0, 188, 255, 0.08)',
          }}
        >
          <p className="mb-0 fs-5">{serie.comentarioBM}</p>
          <footer className="blockquote-footer mt-1">Comentario BM</footer>
        </blockquote>
      )}

      {/* BOTÓN VOLVER */}
      <div className="mt-4">
        <BackButton />
      </div>
    </main>
  )
}
