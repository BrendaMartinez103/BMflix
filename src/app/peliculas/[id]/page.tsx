import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import BackButton from '@/app/components/BackButton'

export default async function MoviesPage({ 
  params, 
}: { 
  params: Promise<{ id: string }>
}) 
{ 
  const { id } = await params
  const moviesId = Number(id)

  if (!Number.isFinite(moviesId)) notFound()

  const movie = await prisma.movie.findUnique({
     where: { id: moviesId },
    include: {
      originalLanguage: true,
      genres: true,
      content: {
        select: { rating: true, posterUrl: true },
      },
    }
  })

    if (!movie) notFound()

   const poster =
    movie.posterUrl ||
    movie.content?.posterUrl ||
    '/logo.png'

  const bmScore = movie.rating != null ? Number(movie.rating) : null
  const communityScore = movie.content?.rating != null ? Number(movie.content.rating) : null
  const lang = movie.originalLanguage
    ? `${movie.originalLanguage.name} (${movie.originalLanguage.code.toUpperCase()})`
    : '—'
  const genreNames = movie.genres.map(g => g.name)

  return (
    <main className="container py-5">
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
              <strong>Puntaje BM:</strong>{' '}
              {bmScore != null ? (
                <>
                  <span style={{ color: '#0dcaf0' }}>★</span> {bmScore.toFixed(1)} / 10
                </>
              ) : (
                '★ —'
              )}
            </p>

            <p className="mb-1">
              <strong>Puntaje Comunidad:</strong>{' '}
              {communityScore != null ? (
                <>
                  <span style={{ color: 'gold' }}>★</span> {communityScore.toFixed(1)} / 10
                </>
              ) : (
                '★ —'
              )}
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
          <p className="lead">{movie.description}</p>
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
          <BackButton />
      </div>
    </main>
  )
}
