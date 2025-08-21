export type SeasonData = { number: number; episodesCount: number; year?: number };
export type SeriesData = {
  name: string;
  startYear: number;
  endYear?: number | null;
  description: string;
  director?: string | null;
  protagonists?: string[];
  comentarioBM?: string | null;
  lang: 'en' | 'es' | 'ko' | 'zh' | 'de' | 'sv' | 'da' | 'th' | 'ja';
  posterUrl?: string | null;
  rating?: number | null;
  genres: string[];              
  seasons: SeasonData[];
};

export const seriesData: SeriesData[] = [
  {
    name: 'Breaking Bad',
    startYear: 2008,
    endYear: 2013,
    description:
      'Un profesor de química con problemas económicos a quien le diagnostican un cáncer de pulmón inoperable. Para pagar su tratamiento y asegurar el futuro económico de su familia, comienza a cocinar y vender metanfetamina.',
    director: 'Vince Gilligan',
    protagonists: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Bob Odenkirk', 'Dean Norris'],
    comentarioBM: 'Mi serie favorita, mi top 1 indiscutible y de muchos amantes del cine. NOTA-> 10',
    lang: 'en',
    posterUrl: '/posters/breaking-bad.png',
    rating: 10,
    genres: ['Drama', 'Crimen'],
    seasons: [
      { number: 1, episodesCount: 7,  year: 2008 },
      { number: 2, episodesCount: 13, year: 2009 },
      { number: 3, episodesCount: 13, year: 2010 },
      { number: 4, episodesCount: 13, year: 2011 },
      { number: 5, episodesCount: 16, year: 2012 },
    ],
  },
  {
    name: 'Vis a Vis',
    startYear: 2015,
    endYear: 2020,
    description:
      'Serie española ambientada en una cárcel de mujeres. Muestra dinámicas de poder, conflictos entre internas, relación con funcionarios y la dureza del encierro. Drama y thriller centrados en supervivencia, alianzas y traiciones.',
    director: 'Daniel Écija, Álex Pina, Iván Escobar, Esther Martínez Lobato',
    protagonists: ['Najwa Nimri', 'Maggie Civantos', 'Carlos Hipólito', 'Roberto Enríquez', 'Cristina Plazas', 'Berta Vázquez', 'Alba Flores'],
    comentarioBM: 'Dentro de mi top 5, el personaje de Zulema es toda una joya. NOTA-> 9',
    lang: 'es',
    posterUrl: '/posters/vis-a-vis.png',
    rating: 9,
    genres: ['Suspenso', 'Drama', 'Policial'],
    seasons: [
      { number: 1, episodesCount: 11, year: 2015 },
      { number: 2, episodesCount: 13, year: 2016 },
      { number: 3, episodesCount: 8,  year: 2018 },
      { number: 4, episodesCount: 8,  year: 2019 },
      { number: 5, episodesCount: 8,  year: 2020 },
    ],
  },
  {
    name: 'How to Get Away with Murder',
    startYear: 2014,
    endYear: 2020,
    description:
      'Annalise Keating, abogada y profesora de derecho, junto a cinco de sus estudiantes, se ven envueltos en una compleja trama de asesinato.',
    director: 'Peter Nowalk',
    protagonists: ['Viola Davis', 'Billy Brown', 'Alfred Enoch', 'Jack Falahee', 'Aja Naomi King', 'Matt McGorry', 'Karla Souza', 'Charlie Weber', 'Liza Weil', 'Conrad Ricamora'],
    comentarioBM: 'Dentro de mi top 5 de series, una última temporada MUY buena. NOTA-> 9',
    lang: 'en',
    posterUrl: '/posters/htgawm.png',
    rating: 9,
    genres: ['Drama', 'Suspenso'],
    seasons: [
      { number: 1, episodesCount: 15, year: 2015 },
      { number: 2, episodesCount: 15, year: 2016 },
      { number: 3, episodesCount: 15, year: 2017 },
      { number: 4, episodesCount: 15, year: 2018 },
      { number: 5, episodesCount: 15, year: 2019 },
      { number: 6, episodesCount: 15, year: 2020 },
    ],
  },
  {
    name: 'Apache: La vida de Carlos Tevez',
    startYear: 2019,
    endYear: 2019,
    description:
      'La vida de Carlos Tevez, desde sus comienzos hasta su ascenso a la fama.',
    director: 'Leonardo De Pinto',
    protagonists: ['Balthazar Murillo', 'Vanesa González', 'Alberto Ajaka', 'Sofía Gala Castiglione', 'Matías Recalt', 'Osqui Guzmán', 'Diego Gallardo'],
    comentarioBM: 'No me suelen encantar las autobiográficas pero esta me gustó. NOTA-> 7.5',
    lang: 'es',
    posterUrl: '/posters/Tevez.png',
    rating: 7.5,
    genres: ['Drama', 'Biográfica'],
    seasons: [{ number: 1, episodesCount: 8, year: 2019 }],
  },
  {
    name: 'Mindfulness para asesinos',
    startYear: 2024,
    endYear: 2024,
    description:
      'Björn, abogado de mafiosos, asiste a una clase de mindfulness para equilibrar su vida y… matar mejor.',
    director: 'Boris Kunz, Martina Plura, Max Zähle',
    protagonists: ['Tom Schilling', 'Emily Cox', 'Peter Jordan', 'Murathan Muslu', 'Sascha Geršak', 'Britta Hammelstein', 'Marc Hosemann', 'Pamuk Pilavci', 'Johannes Allmayer'],
    comentarioBM: 'Entretenida para pasar el rato. NOTA-> 6',
    lang: 'de',
    posterUrl: '/posters/Mindfulness.png',
    rating: 6,
    genres: ['Suspenso', 'Comedia'],
    seasons: [{ number: 1, episodesCount: 8, year: 2024 }],
  },
  {
    name: 'Cromañón',
    startYear: 2024,
    endYear: 2024,
    description:
      'Basada en hechos reales. Se centra en un grupo de amigos afectados por la masacre de Cromañón (2004).',
    director: 'Fabiana Tiscornia, Marialy Rivas',
    protagonists: ['Olivia Nuss', 'Toto Rovito', 'José Giménez Zapiola', 'Luis Machín', 'Soledad Villamil', 'Antonia Bengoechea', 'Lautaro Rodríguez', 'Nicole Mottchouk', 'Eloy Rossen'],
    comentarioBM: 'Esperaba más; se enfoca en el grupo de amigos y no tanto en la tragedia. NOTA-> 4',
    lang: 'es',
    posterUrl: '/posters/Cromañón.png',
    rating: 4,
    genres: ['Drama', 'Basada en hechos reales'],
    seasons: [{ number: 1, episodesCount: 8, year: 2024 }],
  },
  {
    name: 'Mi dulce niña',
    startYear: 2023,
    endYear: 2023,
    description:
       'El escape de una misteriosa mujer de su angustioso cautiverio orienta a los investigadores hacia la oscura verdad que se esconde tras su desaparición sin resolver 13 años antes.',
    director: 'Isabel Kleefeld, Julian Pörksen',
    protagonists: ['Kim Riedle', 'Naila Schuberth', 'Sammy Schrein', 'Hans Löw', 'Haley Louise Jones'],
    comentarioBM: 'Una serie muy atrapante, con mucha intriga, muy buena. NOTA-> 8.0 ',
    lang: 'de',
    posterUrl: '/posters/MiDulceNiña.png',
    rating: 8.0,
    genres: ['Drama', 'Suspenso', 'Policial'],
    seasons: [{ number: 1, episodesCount: 6, year: 2023 }],
  },
  {
      name: 'La cúpula de cristal',
      startYear: 2025,
      endYear: 2025,
      description:
        'Cuando la hija de su amiga desaparece, la criminóloga Lejla se une a la búsqueda, lo que la lleva a enfrentar el trauma persistente de su propio secuestro cuando era niña.',
      director: 'Camilla Läckberg',
      protagonists: ['Léonie Vincent', 'Johan Hedenberg', 'Johan Rheborg'],
      comentarioBM: 'Muy entretenida, con mucho suspenso y un final atrapante e inesperado. NOTA-> 8.2 ',
      lang: 'sv',
      posterUrl: '/posters/la-cupula.png',
      rating: 8.2,
      genres: ['Drama', 'Suspenso', 'Policial'],
      seasons: [{ number: 1, episodesCount: 6, year: 2025 }],
    },

    {
      name: 'Los secretos que ocultamos',
      startYear: 2025,
      endYear: 2025,
      description:
        'Cuando la au pair de una vecina desaparece de su lujoso suburbio, Cecilie busca respuestas y descubre secretos que hacen añicos su mundo aparentemente perfecto.',
      director: 'Ingeborg Topsøe',
      protagonists: ['Marie Bach Hansen', 'Excel Busano', 'Danica Curcic'],
      comentarioBM: 'Una serie muy atrapante, con un trasfondo y analisis muy interesante. NOTA-> 8.4 ',
      lang: 'da',
      posterUrl: '/posters/los-secretos.png',
      rating: 8.4,
      genres: ['Drama', 'Suspenso', 'Policial'],
      seasons: [{ number: 1, episodesCount: 6, year: 2025 }],
    },
  {
    name: 'Un héroe débil',
    startYear: 2022,
    endYear: 2025,
    description:
      'Un estudiante brillante pero introvertido se enfrenta a acosadores y enemigos violentos con la ayuda de amistades inesperadas, sin saber los peligros que le esperan.',
    director: 'You Su-min, Han Jun-hee y Park Hyun-woo',
    protagonists: ['Park Ji-hoon', 'Choi Hyun-wook', 'Hong Kyung'],
    comentarioBM: 'Tensa, directa y sin relleno. Me gustó mucho. NOTA-> 8.2',
    lang: 'ko',
    posterUrl: '/posters/heroe-debil.png',
    rating: 8.2,
    genres: ['Drama', 'Suspenso', 'Acción'],
    seasons: [
      { number: 1, episodesCount: 8, year: 2022 },
      { number: 2, episodesCount: 8, year: 2025 },
    ],
  },
  {
    name: 'Karma',
    startYear: 2025,
    endYear: 2025,
    description:
      'Un accidente fatídico entrelaza las vidas de seis personas en una historia cargada de karma y crimen en la que deben enfrentar sus oscuras verdades y conexiones.',
    director: 'Lee Il-hyung',
    protagonists: ['Park Hae-soo', 'Shin Min-a', 'Lee Hee-jun'],
    comentarioBM: 'Me encanto esta serie, muy atrapante. NOTA-> 9.0',
    lang: 'ko',
    posterUrl: '/posters/karma.png',
    rating: 9.0,
    genres: ['Suspenso', 'Drama'],
    seasons: [{ number: 1, episodesCount: 6, year: 2024 }],
  },
  {
    name: 'La gloria',
    startYear: 2022,
    endYear: 2023,
    description:
      'Años después de sufrir brutales abusos, una mujer diseña un plan meticuloso para hacer caer a sus agresores uno por uno.',
    director: 'Kim Eun-sook y An Gil-ho',
    protagonists: ['Song Hye-kyo', 'Lee Do-hyun','Lim Ji-yeon'],
    comentarioBM: 'Venganza elegante y calculada, muy buen desarrollo de la historia. NOTA-> 8.8',
    lang: 'ko',
    posterUrl: '/posters/la-gloria.png',
    rating: 8.8,
    genres: ['Drama', 'Suspenso'],
    seasons: [{ number: 1, episodesCount: 16, year: 2022 }],
  },
  {
    name: 'La chica enmascarada',
    startYear: 2023,
    endYear: 2023,
    description:
      'Una oficinista acomplejada por su aspecto se convierte en una enmascarada celebridad de internet por las noches. Hasta que unos fatídicos eventos dan un vuelco a su vida.',
    director: 'Kim Yong-hoon',
    protagonists: ['Ko Hyun-jung', 'Ahn Jae-hong', 'Yeom Hye-ran'],
    comentarioBM: 'Buena, entretenida, no falla. NOTA-> 7.6',
    lang: 'ko',
    posterUrl: '/posters/la-chica-enmascarada.png',
    rating: 7.6,
    genres: ['Suspenso', 'Drama'],
    seasons: [{ number: 1, episodesCount: 7, year: 2023 }],
  },
  {
    name: 'La guarida del león',
    startYear: 2024,
    endYear: 2024,
    description:
      'La llegada de un misterioso niño interrumpe la tranquila y predecible vida de un artista con autismo y su afectuoso hermano mayor.',
    director: 'Julián Ortega',
    protagonists: ['Yuya Yagira', 'Ryota Bando', 'Asuka Saito'],
    comentarioBM: 'Me encanto, un drama hermoso, deja un gran aprendizaje sobre la discapacidad. NOTA-> 8.9',
    lang: 'ja',
    posterUrl: '/posters/la-guarida-del-leon.png',
    rating: 8.9,
    genres: [ 'Suspenso', 'Drama'],
    seasons: [{ number: 1, episodesCount: 11, year: 2024 }],
  },
  {
    name: 'Traición cercana',
    startYear: 2024,
    endYear: 2024,
    description:
      'Un perfilador criminal comienza a cuestionarse todo lo que cree sobre la búsqueda de la justicia cuando su hija es acusada de asesinato.',
    director: 'Song Yeon-hwa y Han A-yeong',
    protagonists: ['Han Seok-kyu', 'Chae Won-bin', 'Han Ye-ri'],
    comentarioBM: 'MUY buena serie, me encantó, todo el tiempo dudas de quien es el asesino, recomiendo. NOTA-> 9.3',
    lang: 'ko',
    posterUrl: '/posters/traicion-cercana.png',
    rating: 9.3,
    genres: ['Suspenso', 'Policial', 'Drama'],
    seasons: [{ number: 1, episodesCount: 10, year: 2024 }],
  },

];
