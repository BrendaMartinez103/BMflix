export type MovieData = {
  name: string;
  releaseYear: number;
  description: string;
  director?: string | null;
  protagonists?: string[];
  comentarioBM?: string | null;
  lang: 'en' | 'es' | 'ko' | 'zh' | 'de';
  posterUrl?: string | null;
  rating?: number | null;
  genres: string[];
};

export const moviesData: MovieData[] = [
  {
    name: 'El Camino: A Breaking Bad Movie',
    releaseYear: 2019,
    description:
      'Jesse Pinkman huye tras su escape dramático del cautiverio, y debe enfrentarse a su pasado para poder construir un futuro.',
    director: 'Vince Gilligan',
    protagonists: ['Aaron Paul', 'Charles Baker', 'Matt Jones'],
    comentarioBM: 'Un cierre para la historia de Jesse, sin más. NOTA-> 6 ',
    lang: 'en',
    posterUrl: '/posters/el-camino.png',
    rating: 6,
    genres: ['Drama', 'Suspenso', 'Crimen'],
  },
  {
    name: 'El Cuerpo',
    releaseYear: 2012,
    description:
      'Un inspector investiga la misteriosa desaparición del cadáver de una mujer en la morgue.',
    director: 'Oriol Paulo',
    protagonists: ['José Coronado', 'Hugo Silva', 'Belén Rueda',	'Aura Garrido', 'Juan Pablo Shuk', 'Cristina Plazas', 'Oriol Vila'],
    comentarioBM: 'Mucho suspenso, me gustóm mucho. NOTA-> 7.5 ',
    lang: 'es',
    posterUrl: '/posters/el-cuerpo.png',
    rating: 7.5,
    genres: ['Suspenso', 'Drama'],
  },
  {
    name: 'La isla siniestra',
    releaseYear: 2010,
    description:
      'Dos agentes federales investigan la desaparición de una interna en un hospital psiquiátrico en una isla remota.',
    director: 'Martin Scorsese',
    protagonists: ['Leonardo DiCaprio', 'Mark Ruffalo', 'Ben Kingsley'],
    comentarioBM: 'Increible desarrollo y sorprendente final, me encanta el genero de Thriller psicológico. NOTA-> 8.7 ',
    lang: 'en',
    posterUrl: '/posters/shutter-island.png',
    rating: 8.7,
    genres: ['Suspenso', 'Drama', 'Thriller psicológico']
  },
  {
    name: 'La sociedad de la nieve',
    releaseYear: 2023,
    description:
      'La tragedia de los Andes de 1972, donde un avión uruguayo se estrella en la cordillera y los sobrevivientes deben luchar por su vida.',
    director: 'J. A. Bayona',
    protagonists: ['Enzo Vogrincic', 'Matías Recalt', 'Agustín Pardella'],
    comentarioBM: 'Cruda y emotiva, retrata muy bien la historia real. NOTA-> 8.0',
    lang: 'es',
    posterUrl: '/posters/sociedad-de-la-nieve.png',
    rating: 8.0,
    genres: ['Drama', 'Basada en hechos reales'],
  },
  {
    name: 'Olvidado',
    releaseYear: 2017,
    description:
      'Tras un misterioso secuestro, un joven intenta descubrir qué le ocurrió a su hermano.',
    director: 'Jang Hang-jun',
    protagonists: ['Kang Ha-neul', 'Kim Mu-yeol','Moon Sung-keun','Na Young-hee'],
    comentarioBM: 'Thriller coreano, una joya, no te esperas lo que esta sucediendo en realidad. NOTA-> 8.7',
    lang: 'ko',
    posterUrl: '/posters/olvidado.png',
    rating: 8.7,
    genres: ['Suspenso', 'Thriller psicológico'],
  },
  {
    name: 'Un lugar silencioso',
    releaseYear: 2018,
    description:
      'Una familia debe vivir en silencio absoluto para esconderse de criaturas que cazan por el sonido.',
    director: 'John Krasinski',
    protagonists: ['Emily Blunt', 'John Krasinski', 'Millicent Simmonds'],
    comentarioBM: 'Regular, cumple. NOTA-> 6',
    lang: 'en',
    posterUrl: '/posters/a-quiet-place.png',
    rating: 6,
    genres: ['Terror', 'Suspenso'],
  },
  {
    name: 'Un lugar silencioso Day One',
    releaseYear: 2024,
    description:
      'Antes de la primera película, una mujer llamada Sam debe sobrevivir a una invasión en la Ciudad de Nueva York por criaturas alienígenas sedientas de sangre con audición ultrasónica.',
    director: 'Michael Sarnoski',
    protagonists: [	'Lupita Nyong','Joseph Quinn', 'Alex Wolff','Djimon Hounsou'],
    comentarioBM: 'Lamentablemente la vi en el cine, nada nuevo. NOTA-> 5',
    lang: 'en',
    posterUrl: '/posters/a-quiet-place-Day-One.png',
    rating: 5,
    genres: ['Terror', 'Suspenso'],
  },
  {
    name: 'Parásitos',
    releaseYear: 2019,
    description:
      'Una familia pobre se infiltra en la vida de una familia rica con consecuencias inesperadas.',
    director: 'Bong Joon-ho',
    protagonists: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik', 'Park So-dam'],
    comentarioBM: 'Obra maestra coreana, ganadora del Oscar. NOTA-> 5',
    lang: 'ko',
    posterUrl: '/posters/parasite.png',
    rating: 8.8,
    genres: ['Drama', 'Suspenso'],
  },
  {
    name: 'Destino final: Lazos de sangre',
    releaseYear: 2025,
    description:
      'El sexto capítulo de la sangrienta franquicia te lleva al inicio del retorcido sentido de justicia del destino cuando una joven universitaria descubre que su abuela fue quien interrumpió el diseño original de la Muerte en 1968.',
    director: 'Adam Stein, Zach Lipovsky',
    protagonists: ['Kaitlyn Santa Juana','Teo Briones','Richard Harmon','Owen Patrick Joyner','Rya Kihlstedt','Anna Lore','Brec Bassinger','Tony Todd'],
    comentarioBM: 'La fui a ver al cine, y esta saga la verdad que no decepciona, me gusto la vuelta que le encontraron en esta sexta pelicula. NOTA-> 7.9',
    lang: 'en',
    posterUrl: '/posters/final-destination.png',
    rating: 7.9,
    genres: ['Terror', 'Suspenso'],
  },
  {
    name: 'El secreto de sus ojos',
    releaseYear: 2009,
    description:
      'Un empleado judicial retirado decide escribir una novela sobre un caso de homicidio que lo obsesionó durante su carrera.',
    director: 'Juan José Campanella',
    protagonists: ['Ricardo Darín', 'Soledad Villamil', 'Guillermo Francella'],
    comentarioBM: 'La vi en el cineDe lo mejor del cine argentino. Oscar merecido. Ricardo Darín impecable como nos tiene acostumbrados, gran elenco. NOTA-> 9.1',
    lang: 'es',
    posterUrl: '/posters/el-secreto-de-sus-ojos.png',
    rating: 9.1,
    genres: ['Drama', 'Policial'],
  },
  {
    name: 'Un viernes de locos',
    releaseYear: 2003,
    description:
      'Una madre y su hija intercambian cuerpos y deben adaptarse a la vida de la otra por un día.',
    director: 'Mark Waters',
    protagonists: ['Lindsay Lohan', 'Jamie Lee Curtis', 'Chad Michael Murray'],
    comentarioBM: 'Mi pelicula favorita de Disney. NOTA-> 9.0',
    lang: 'en',
    posterUrl: '/posters/freaky-friday.png',
    rating: 9.0,
    genres: ['Comedia', 'Familiar'],
  },
  {
    name: 'Otro viernes de locos',
    releaseYear: 2025,
    description:
      'Años después de que Tess y Anna sufrieran una crisis de identidad, Anna ahora tiene una hija y una hijastra. Enfrentan los desafíos que se presentan cuando dos familias se fusionan. Tess y Anna descubren que un rayo puede caer dos veces.',
    director: 'Nisha Ganatra',
    protagonists: ['Lindsay Lohan', 'Jamie Lee Curtis', 'Julia Butters', 'Sophia Hammons'],
    comentarioBM: 'La vi en el cine, me encanto que esten todos los actores de la primer parte, me rei hasta llorar y tambien tiene partes emotivas, muchos sentimientos generados. NOTA-> 9.0',
    lang: 'en',
    posterUrl: '/posters/freaky-friday-2.png',
    rating: 9.0,
    genres: ['Comedia', 'Familiar'],
  },
];

