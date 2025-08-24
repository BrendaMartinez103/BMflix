import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function MoviesPage({
  params,
}: {
  params: Promise<{ id: string }>

}) {

  const { id } = await params
  const moviesId = Number(id)

  const movie = await prisma.movie.findUnique({
    where: { id: moviesId },
    include: {
      originalLanguage: true,
      content: true,
      genres: true,
    },
  })

  if (!movie) {
    return (
      <main className="container py-5">
        <h1 className="text-danger">Pelicula no encontrada</h1>
        <Link href="/peliculas" className="btn btn-primary mt-3">Volver</Link>
      </main>
    )
  }

  const poster =
    (movie.posterUrl && movie.posterUrl.startsWith('/')) ? movie.posterUrl
    : (movie.content?.posterUrl && movie.content.posterUrl.startsWith('/')) ? movie.content.posterUrl
    : '/logo.png'

  const ratingNumber = movie.rating != null ? Number(movie.rating) : null
  const lang = movie.originalLanguage
    ? `${movie.originalLanguage.name} (${movie.originalLanguage.code.toUpperCase()})`
    : '—'

  const genreNames = movie.genres.map(g => g.name)

  return (
    <main className="container py-5">
      {/* FILA PRINCIPAL */}
      <div className="row g-4">
        {/* Col izquierda: Poster + info abajo */}
        <div className="col-md-4">
          <div className="mb-3">
            <Image
              src={poster}
              alt={movie.name}
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
              <strong>Puntaje:</strong>{' '}
              {ratingNumber != null ? `⭐ ${ratingNumber.toFixed(1)} / 10` : '⭐ —'}
            </p>
            {genreNames.length > 0 && (
              <p className="mb-1">
                <strong>Géneros:</strong> {genreNames.join(' · ')}
              </p>
            )}
            {movie.director && (
              <p className="mb-1"><strong>Creada por :</strong> {movie.director}</p>
            )}
            {Array.isArray(movie.protagonists) && movie.protagonists.length > 0 && (
              <p className="mb-1">
                <strong>Protagonistas:</strong> {movie.protagonists.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Col derecha: Título + años + descripción */}
        <div className="col-md-8">
          <h1 className="mb-2 text-primary">{movie.name}</h1>
          <p className="lead">
            {movie.description}
          </p>
        </div>
      </div>

      {/* COMENTARIO BM */}
      {movie.comentarioBM && (
        <blockquote
          className="blockquote mt-4 p-4 rounded"
          style={{
            borderLeft: '4px solid var(--primary)',
            background: 'rgba(0, 188, 255, 0.08)',
          }}
        >
          <p className="mb-0 fs-5">{movie.comentarioBM}</p>
          <footer className="blockquote-footer mt-1">Comentario BM</footer>
        </blockquote>
      )}

      {/* BOTÓN VOLVER */}
      <div className="mt-4">
        <Link href="/peliculas" className="btn btn-outline-primary">
          ← Volver a Peliculas
        </Link>
      </div>
    </main>
  )
}
