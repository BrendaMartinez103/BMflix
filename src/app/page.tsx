import Image from 'next/image'
export default function Home() {
  return (
    <main
      className="min-vh-100"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Imagen principal */}
      <div className="container my-4 d-flex justify-content-center">
        <Image
          src="/encabezado.jpeg"
          alt="rankea tus series y peliculas favoritas"
          width={1100}
          height={500}
          className="rounded shadow-sm"
        />
      </div>

      {/* Nombre y slogan */}
      <div className="container text-center my-5">
        <h1 className="display-4 fw-bold text-purple">BMflix</h1>
        <p className="fs-4 text-muted-foreground">📺 Tu guía para elegir la próxima maratón. Donde las historias reciben tu puntaje.</p>
      </div>

    </main>
  )
}