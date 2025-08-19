import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ---------- Languages ----------
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
    { code: 'de', name: 'Deutsch' },
  ];
  const byCode: Record<string, { id: number }> = {};
  for (const l of languages) {
    const lang = await prisma.language.upsert({
      where: { code: l.code },
      update: {},
      create: l,
    });
    byCode[l.code] = { id: lang.id };
  }

  // ---------- Genres ----------
  const genres = ['Drama', 'Crimen', 'Ciencia Ficción', 'Suspenso', 'Policial' , 'Biográfica', 'Comedia', 'Basada en hechos reales'];
  const genreMap: Record<string, { id: number }> = {};
  for (const g of genres) {
    const genre = await prisma.genre.upsert({
      where: { name: g },
      update: {},
      create: { name: g },
    });
    genreMap[g] = { id: genre.id };
  }

  // =========================================================
  //                     SERIES: BREAKING BAD
  // =========================================================
  const bbSeasonsData = [
    { number: 1, episodesCount: 7,  year: 2008 },
    { number: 2, episodesCount: 13, year: 2009 },
    { number: 3, episodesCount: 13, year: 2010 },
    { number: 4, episodesCount: 13, year: 2011 },
    { number: 5, episodesCount: 16, year: 2012 },
  ];
  const bbTotalSeasons = bbSeasonsData.length;
  const bbTotalEpisodes = bbSeasonsData.reduce((acc, s) => acc + s.episodesCount, 0);

  // upsert de la serie
  const bb = await prisma.series.upsert({
    where: { name: 'Breaking Bad' }, 
    update: {
      startYear: 2008,
      endYear: 2013,
      description:
        'Un profesor de química con problemas económicos a quien le diagnostican un cáncer de pulmón inoperable. Para pagar su tratamiento y asegurar el futuro económico de su familia, comienza a cocinar y vender metanfetamina',
      director: 'Vince Gilligan',
      protagonists: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Bob Odenkirk', 'Dean Norris'],
      comentarioBM: 'Mi serie favorita, mi top 1 indiscutible y de muchos amantes del cine. NOTA-> 10',
      totalSeasons: bbTotalSeasons,
      totalEpisodes: bbTotalEpisodes,
      originalLanguageId: byCode['en'].id,
      posterUrl: '/posters/breaking-bad.png',
      rating: 10,
      genres: {
        set: [], // limpia relaciones 
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Crimen'].id },
        ],
      },
    },
    create: {
      name: 'Breaking Bad',
      startYear: 2008,
      endYear: 2013,
      description:
        'Un profesor de química con problemas económicos a quien le diagnostican un cáncer de pulmón inoperable. Para pagar su tratamiento y asegurar el futuro económico de su familia, comienza a cocinar y vender metanfetamina.',
      director: 'Vince Gilligan',
      protagonists: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Bob Odenkirk', 'Dean Norris'],
      comentarioBM: 'Mi serie favorita, mi top 1 indiscutible y de muchos amantes del cine. NOTA-> 10',
      totalSeasons: bbTotalSeasons,
      totalEpisodes: bbTotalEpisodes,
      originalLanguageId: byCode['en'].id,
      posterUrl: '/posters/breaking-bad.png',
      rating: 10,
      genres: {
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Crimen'].id },
        ],
      },
    },
  });

  // upsert de Temporadas (usa @@unique([seriesId, number]))
  for (const s of bbSeasonsData) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: bb.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year },
      create: { seriesId: bb.id, ...s },
    });
  }

  // Content para la serie (para grillas)
  await prisma.content.upsert({
    where: { seriesId: bb.id },
    update: {
      name: bb.name,
      posterUrl: bb.posterUrl ?? '/posters/breaking-bad.png',
      rating: bb.rating ?? undefined,
      originalLanguageId: byCode['en'].id,
    },
    create: {
      category: 'SERIES',
      seriesId: bb.id,
      name: bb.name,
      posterUrl: bb.posterUrl ?? '/posters/breaking-bad.png',
      rating: bb.rating ?? undefined,
      originalLanguageId: byCode['en'].id,
    },
  });
// =========================================================
  //                     SERIES: VIS A VIS 
  // =========================================================
  const VisAVisSeasonsData = [
    { number: 1, episodesCount: 11,  year: 2015 },
    { number: 2, episodesCount: 13, year: 2016 },
    { number: 3, episodesCount: 8, year: 2018 },
    { number: 4, episodesCount: 8, year: 2019 },
    { number: 5, episodesCount: 8, year: 2020 },
  ];
  const VisAVisTotalSeasons = VisAVisSeasonsData.length;
  const VisAVisTotalEpisodes = VisAVisSeasonsData.reduce((acc, s) => acc + s.episodesCount, 0);

  // upsert de la serie
  const VisAVis = await prisma.series.upsert({
    where: { name: 'Vis a Vis' }, 
    update: {
      startYear: 2015,
      endYear: 2020,
      description:
        'Vis a vis es una serie española ambientada en una cárcel de mujeres. La trama gira en torno a la vida dentro del penal, mostrando las dinámicas de poder, los conflictos entre internas, la relación con los funcionarios y las duras condiciones de reclusión. Combina drama y thriller, con un enfoque en la supervivencia, las alianzas y traiciones, y el impacto del encierro en cada personaje.',
      director: 'Daniel Écija, Álex Pina, Iván Escobar, Esther Martínez Lobato',
      protagonists: ['Najwa Nimri, Maggie Civantos, Carlos Hipólito, Roberto Enríquez, Cristina Plazas, Berta Vázquez, Alba Flores'],
      comentarioBM: 'Dentro de mi top 5, el personaje de Zulema es toda una joya. NOTA-> 9',
      totalSeasons: VisAVisTotalSeasons,
      totalEpisodes: VisAVisTotalEpisodes,
      originalLanguageId: byCode['es'].id,
      posterUrl: '/posters/vis-a-vis.png',
      rating: 9,
      genres: {
        set: [], // limpia relaciones 
        connect: [
          { id: genreMap['Suspenso'].id },
          { id: genreMap['Drama'].id },
          { id: genreMap['Policial'].id },
        ],
      },
    },
    create: {
      name: 'Vis a Vis',
      startYear: 2015,
      endYear: 2020,
      description:
        'Vis a vis es una serie española ambientada en una cárcel de mujeres. La trama gira en torno a la vida dentro del penal, mostrando las dinámicas de poder, los conflictos entre internas, la relación con los funcionarios y las duras condiciones de reclusión. Combina drama y thriller, con un enfoque en la supervivencia, las alianzas y traiciones, y el impacto del encierro en cada personaje.',
      director: 'Daniel Écija, Álex Pina, Iván Escobar, Esther Martínez Lobato',
      protagonists: ['Najwa Nimri, Maggie Civantos, Carlos Hipólito, Roberto Enríquez, Cristina Plazas, Berta Vázquez, Alba Flores'],
      comentarioBM: 'Dentro de mi top 5, el personaje de Zulema es toda una joya. NOTA-> 9',
      totalSeasons: VisAVisTotalSeasons,
      totalEpisodes: VisAVisTotalEpisodes,
      originalLanguageId: byCode['es'].id,
      posterUrl: '/posters/vis-a-vis.png',
      rating: 9,
      genres: {
        connect: [
          { id: genreMap['Suspenso'].id },
          { id: genreMap['Drama'].id },
          { id: genreMap['Policial'].id },
        ],
      },
    },
  });

  // upsert de Temporadas (usa @@unique([seriesId, number]))
  for (const s of VisAVisSeasonsData) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: VisAVis.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year },
      create: { seriesId: VisAVis.id, ...s },
    });
  }

  // Content para la serie (para grillas)
  await prisma.content.upsert({
    where: { seriesId: VisAVis.id },
    update: {
      name: VisAVis.name,
      posterUrl: VisAVis.posterUrl ?? '/posters/vis-a-vis.png',
      rating: VisAVis.rating ?? undefined,
      originalLanguageId: byCode['es'].id,
    },
    create: {
      category: 'SERIES',
      seriesId: VisAVis.id,
      name: VisAVis.name,
      posterUrl: VisAVis.posterUrl ?? '/posters/vis-a-vis.png',
      rating: VisAVis.rating ?? undefined,
      originalLanguageId: byCode['es'].id,
    },
  });
// =========================================================
  //                     SERIES: How to Get Away with Murder
  // =========================================================
  const htgawmSeasonsData = [
    { number: 1, episodesCount: 15,  year: 2015 },
    { number: 2, episodesCount: 15, year: 2016 },
    { number: 3, episodesCount: 15, year: 2017 },
    { number: 4, episodesCount: 15, year: 2018 },
    { number: 5, episodesCount: 15, year: 2019 },
     { number: 6, episodesCount: 15, year: 2020 },
  ];
  const htgawmTotalSeasons = htgawmSeasonsData.length;
  const htgawmTotalEpisodes = htgawmSeasonsData.reduce((acc, s) => acc + s.episodesCount, 0);

  // upsert de la serie
  const htgawm = await prisma.series.upsert({
    where: { name: 'How to Get Away with Murder' },
    update: {
      startYear: 2014,
      endYear: 2020,
      description:
        'Annalise Keating , abogada defensora y profesora de derecho en una prestigiosa universidad de Filadelfia , quien, junto con cinco de sus estudiantes, se ve involucrada en una compleja trama de asesinato',
      director: '	Peter Nowalk',
      protagonists: ['	Viola Davis, Billy Brown, Alfredo Enoc, Jack Falahee, Katie Findlay, Aja Naomi King, Matt McGorry, Karla Souza, Charlie Weber, Liza Weil, Conrad Ricamora'],
      comentarioBM: 'Dentro de mi top 5 de series, una última temporada MUY buena. NOTA-> 9',
      totalSeasons: htgawmTotalSeasons,
      totalEpisodes: htgawmTotalEpisodes,
      originalLanguageId: byCode['en'].id,
      posterUrl: '/posters/htgawm.png',
      rating: 9,
      genres: {
        set: [], // limpia relaciones 
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Suspenso'].id },
        ],
      },
    },
    create: {
      name: 'How to Get Away with Murder',
      startYear: 2014,
      endYear: 2020,
      description:
        'Annalise Keating , abogada defensora y profesora de derecho en una prestigiosa universidad de Filadelfia , quien, junto con cinco de sus estudiantes, se ve involucrada en una compleja trama de asesinato',
      director: '	Peter Nowalk',
      protagonists: ['	Viola Davis, Billy Brown, Alfredo Enoc, Jack Falahee, Katie Findlay, Aja Naomi King, Matt McGorry, Karla Souza, Charlie Weber, Liza Weil, Conrad Ricamora'],
      comentarioBM: 'Dentro de mi top 5 de series, una última temporada MUY buena. NOTA-> 9',
      totalSeasons: htgawmTotalSeasons,
      totalEpisodes: htgawmTotalEpisodes,
      originalLanguageId: byCode['en'].id,
      posterUrl: '/posters/htgawm.png',
      rating: 9,
      genres: {
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Suspenso'].id },
        ],
      },
    },
  });

  // upsert de Temporadas (usa @@unique([seriesId, number]))
  for (const s of htgawmSeasonsData) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: htgawm.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year },
      create: { seriesId: htgawm.id, ...s },
    });
  }

  // Content para la serie (para grillas)
  await prisma.content.upsert({
    where: { seriesId: htgawm.id },
    update: {
      name: htgawm.name,
      posterUrl: htgawm.posterUrl ?? '/posters/htgawm.png',
      rating: htgawm.rating ?? undefined,
      originalLanguageId: byCode['en'].id,
    },
    create: {
      category: 'SERIES',
      seriesId: htgawm.id,
      name: htgawm.name,
      posterUrl: htgawm.posterUrl ?? '/posters/htgawm.png',
      rating: htgawm.rating ?? undefined,
      originalLanguageId: byCode['en'].id,
    },
  });

  // =========================================================
  //                     SERIES: Apache: La vida de Carlos Tevez
  // =========================================================
  const TevezSeasonsData = [
    { number: 1, episodesCount: 8,  year: 2019 },
  ];
  const TevezTotalSeasons = TevezSeasonsData.length;
  const TevezTotalEpisodes = TevezSeasonsData.reduce((acc, s) => acc + s.episodesCount, 0);

  // upsert de la serie
  const Tevez = await prisma.series.upsert({
    where: { name: 'Apache: La vida de Carlos Tevez' },
    update: {
      startYear: 2019,
      endYear: 2019,
      description:
        'La vida de Carlos Tevez, un famoso futbolista argentino, desde sus humildes comienzos hasta su ascenso a la fama.',
      director: '	Leonardo De Pinto',
      protagonists: ['	Balthazar Murillo, Vanesa González, Alberto Ajaka, Sofía Gala Castiglione, Matías Recalt, Osqui Guzmán, Diego Gallardo'],
      comentarioBM: 'No me suelen encantar las series autobiograficas pero esta en particular me gustó mucho.NOTA-> 7.5 ',
      totalSeasons: TevezTotalSeasons,
      totalEpisodes: TevezTotalEpisodes,
      originalLanguageId: byCode['de'].id,
      posterUrl: '/posters/Tevez.png',
      rating: 7.5,
      genres: {
        set: [], // limpia relaciones 
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Biográfica'].id },
        ],
      },
    },
    create: {
      name: 'Apache: La vida de Carlos Tevez',
      startYear: 2019,
      endYear: 2019,
      description:
        'La vida de Carlos Tevez, un famoso futbolista argentino, desde sus humildes comienzos hasta su ascenso a la fama.',
      director: 'Leonardo De Pinto',
      protagonists: ['Balthazar Murillo, Vanesa González, Alberto Ajaka, Sofía Gala Castiglione, Matías Recalt, Osqui Guzmán, Diego Gallardo'],
      comentarioBM: 'No me suelen encantar las series autobiograficas pero esta en particular me gustó mucho.NOTA-> 7.5 ',
      totalSeasons: TevezTotalSeasons,
      totalEpisodes: TevezTotalEpisodes,
      originalLanguageId: byCode['es'].id,
      posterUrl: '/posters/Tevez.png',
      rating: 7.5,
      genres: {
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Biográfica'].id },
        ],
      },
    },
  });

  // upsert de Temporadas (usa @@unique([seriesId, number]))
  for (const s of TevezSeasonsData) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: Tevez.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year },
      create: { seriesId: Tevez.id, ...s },
    });
  }

  // Content para la serie (para grillas)
  await prisma.content.upsert({
    where: { seriesId: Tevez.id },
    update: {
      name: Tevez.name,
      posterUrl: Tevez.posterUrl ?? '/posters/Tevez.png',
      rating: Tevez.rating ?? undefined,
      originalLanguageId: byCode['es'].id,
    },
    create: {
      category: 'SERIES',
      seriesId: Tevez.id,
      name: Tevez.name,
      posterUrl: Tevez.posterUrl ?? '/posters/Tevez.png',
      rating: Tevez.rating ?? undefined,
      originalLanguageId: byCode['es'].id,
    },
  });

  // =========================================================
  //                     SERIES: Mindfulness para asesinos
  // =========================================================
  const MindfulnessSeasonsData = [
    { number: 1, episodesCount: 8,  year: 2024 },
  ];
  const MindfulnessTotalSeasons = MindfulnessSeasonsData.length;
  const MindfulnessTotalEpisodes = MindfulnessSeasonsData.reduce((acc, s) => acc + s.episodesCount, 0);

  // upsert de la serie
  const Mindfulness = await prisma.series.upsert({
    where: { name: 'Mindfulness para asesinos' },
    update: {
      startYear: 2024,
      endYear: 2024,
      description:
        'Björn, un abogado de mafiosos, asiste a una clase de mindfulness para lograr equilibrar su trabajo con su vida personal. Y aprende varias estrategias, como, por ejemplo, matar.',
      director: 'Boris Kunz, Martina Plura, Max Zähle',
      protagonists: ['Tom Schilling, Emily Cox, Peter Jordan, Murathan Muslu, Sascha Geršak, Britta Hammelstein, Marc Hosemann, Pamuk Pilavci y Johannes Allmayer'],
      comentarioBM: 'Una serie entretenida para pasar el rato. NOTA-> 6 ',
      totalSeasons: MindfulnessTotalSeasons,
      totalEpisodes: MindfulnessTotalEpisodes,
      originalLanguageId: byCode['de'].id,
      posterUrl: '/posters/Mindfulness.png',
      rating: 6,
      genres: {
        set: [], // limpia relaciones 
        connect: [
          { id: genreMap['Suspenso'].id },
          { id: genreMap['Comedia'].id },
        ],
      },
    },
    create: {
      name: 'Mindfulness para asesinos',
      startYear: 2024,
      endYear: 2024,
     description:
        'Björn, un abogado de mafiosos, asiste a una clase de mindfulness para lograr equilibrar su trabajo con su vida personal. Y aprende varias estrategias, como, por ejemplo, matar.',
      director: 'Boris Kunz, Martina Plura, Max Zähle',
      protagonists: ['Tom Schilling, Emily Cox, Peter Jordan, Murathan Muslu, Sascha Geršak, Britta Hammelstein, Marc Hosemann, Pamuk Pilavci y Johannes Allmayer'],
      comentarioBM: 'Una serie entretenida para pasar el rato. NOTA-> 6 ',
      totalSeasons: MindfulnessTotalSeasons,
      totalEpisodes: MindfulnessTotalEpisodes,
      originalLanguageId: byCode['de'].id,
      posterUrl: '/posters/Mindfulness.png',
      rating: 6,
      genres: {
        connect: [
          { id: genreMap['Suspenso'].id },
          { id: genreMap['Comedia'].id },
        ],
      },
    },
  });

  // upsert de Temporadas (usa @@unique([seriesId, number]))
  for (const s of MindfulnessSeasonsData) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: Mindfulness.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year },
      create: { seriesId: Mindfulness.id, ...s },
    });
  }

  // Content para la serie (para grillas)
  await prisma.content.upsert({
    where: { seriesId: Mindfulness.id },
    update: {
      name: Mindfulness.name,
      posterUrl: Mindfulness.posterUrl ?? '/posters/Mindfulness.png',
      rating: Mindfulness.rating ?? undefined,
      originalLanguageId: byCode['de'].id,
    },
    create: {
      category: 'SERIES',
      seriesId: Mindfulness.id,
      name: Mindfulness.name,
      posterUrl: Mindfulness.posterUrl ?? '/posters/Mindfulness.png',
      rating: Mindfulness.rating ?? undefined,
      originalLanguageId: byCode['de'].id,
    },
  });

    // =========================================================
  //                     SERIES: Cromañón
  // =========================================================
  const CromañónSeasonsData = [
    { number: 1, episodesCount: 8,  year: 2024 },
  ];
  const CromañónTotalSeasons = CromañónSeasonsData.length;
  const CromañónTotalEpisodes = CromañónSeasonsData.reduce((acc, s) => acc + s.episodesCount, 0);

  // upsert de la serie
  const Cromañón = await prisma.series.upsert({
    where: { name: 'Cromañón' },
    update: {
      startYear: 2024,
      endYear: 2024,
      description:
        'Cromañón es una serie de televisión basada en hechos reales.​ La historia se centra en un grupo de amigos afectados por los sucesos ocurridos durante la masacre de Cromañón en 2004',
      director: '	Fabiana Tiscornia, Marialy Rivas',
      protagonists: ['Olivia Nuss, Toto Rovito, José Giménez Zapiola, Luis Machín, Soledad Villamil, Antonia Bengoechea, Lautaro Rodríguez,  Nicole Mottchouk Eloy Rossen'],
      comentarioBM: 'Me esperaba mucho más de esta serie, te cuenta la historia del grupo de amigos, en vez de centrarse en la tragedia. NOTA-> 4 ',
      totalSeasons: CromañónTotalSeasons,
      totalEpisodes: CromañónTotalEpisodes,
      originalLanguageId: byCode['es'].id,
      posterUrl: '/posters/Cromañón.png',
      rating: 4,
      genres: {
        set: [], // limpia relaciones 
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Basada en hechos reales'].id },
        ],
      },
    },
    create: {
      name: 'Cromañón',
      startYear: 2024,
      endYear: 2024,
      description:
        'Cromañón es una serie de televisión basada en hechos reales.​ La historia se centra en un grupo de amigos afectados por los sucesos ocurridos durante la masacre de Cromañón en 2004',
      director: '	Fabiana Tiscornia, Marialy Rivas',
      protagonists: ['Olivia Nuss, Toto Rovito, José Giménez Zapiola, Luis Machín, Soledad Villamil, Antonia Bengoechea, Lautaro Rodríguez,  Nicole Mottchouk Eloy Rossen'],
      comentarioBM: 'Me esperaba mucho más de esta serie, te cuenta la historia del grupo de amigos, en vez de centrarse en la tragedia. NOTA-> 4 ',
      totalSeasons: CromañónTotalSeasons,
      totalEpisodes: CromañónTotalEpisodes,
      originalLanguageId: byCode['es'].id,
      posterUrl: '/posters/Cromañón.png',
      rating: 4,
      genres: {
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Basada en hechos reales'].id },
        ],
      },
    },
  });

  // upsert de Temporadas (usa @@unique([seriesId, number]))
  for (const s of CromañónSeasonsData) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: Cromañón.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year },
      create: { seriesId: Cromañón.id, ...s },
    });
  }

  // Content para la serie (para grillas)
  await prisma.content.upsert({
    where: { seriesId: Cromañón.id },
    update: {
      name: Cromañón.name,
      posterUrl: Cromañón.posterUrl ?? '/posters/Cromañón.png',
      rating: Cromañón.rating ?? undefined,
      originalLanguageId: byCode['es'].id,
    },
    create: {
      category: 'SERIES',
      seriesId: Cromañón.id,
      name: Cromañón.name,
      posterUrl: Cromañón.posterUrl ?? '/posters/Cromañón.png',
      rating: Cromañón.rating ?? undefined,
      originalLanguageId: byCode['es'].id,
    },
  });

    // =========================================================
  //                     SERIES: Mi dulce niña 
  // =========================================================
  const MiDulceNiñaSeasonsData = [
    { number: 1, episodesCount: 6,  year: 2023 },
  ];
  const MiDulceNiñaTotalSeasons = MiDulceNiñaSeasonsData.length;
  const MiDulceNiñaTotalEpisodes = MiDulceNiñaSeasonsData.reduce((acc, s) => acc + s.episodesCount, 0);

  // upsert de la serie
  const MiDulceNiña = await prisma.series.upsert({
    where: { name: 'Mi dulce niña' },
    update: {
      startYear: 2023,
      endYear: 2023,
      description:
        'El escape de una misteriosa mujer de su angustioso cautiverio orienta a los investigadores hacia la oscura verdad que se esconde tras su desaparición sin resolver 13 años antes.',
      director: 'Isabel Kleefeld, Julian Pörksen',
      protagonists: ['Kim Riedle, Naila Schuberth, Sammy Schrein, Hans Löw, Haley Louise Jones'],
      comentarioBM: 'Una serie muy atrapante, con mucha intriga, muy buena. NOTA-> 8 ',
      totalSeasons: MiDulceNiñaTotalSeasons,
      totalEpisodes: MiDulceNiñaTotalEpisodes,
      originalLanguageId: byCode['de'].id,
      posterUrl: '/posters/MiDulceNiña.png',
      rating: 8,
      genres: {
        set: [], // limpia relaciones 
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Suspenso'].id },
          { id: genreMap['Policial'].id },
        ],
      },
    },
    create: {
      name: 'MiDulceNiña',
      startYear: 2023,
      endYear: 2023,
      description:
        'El escape de una misteriosa mujer de su angustioso cautiverio orienta a los investigadores hacia la oscura verdad que se esconde tras su desaparición sin resolver 13 años antes.',
      director: 'Isabel Kleefeld, Julian Pörksen',
      protagonists: ['Kim Riedle, Naila Schuberth, Sammy Schrein, Hans Löw, Haley Louise Jones'],
      comentarioBM: 'Una serie muy atrapante, con mucha intriga, muy buena. NOTA-> 8 ',
      totalSeasons: MiDulceNiñaTotalSeasons,
      totalEpisodes: MiDulceNiñaTotalEpisodes,
      originalLanguageId: byCode['de'].id,
      posterUrl: '/posters/MiDulceNiña.png',
      rating: 8,
      genres: {
        connect: [
          { id: genreMap['Drama'].id },
          { id: genreMap['Suspenso'].id },
          { id: genreMap['Policial'].id },
        ],
      },
    },
  });

  // upsert de Temporadas (usa @@unique([seriesId, number]))
  for (const s of MiDulceNiñaSeasonsData) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: MiDulceNiña.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year },
      create: { seriesId: MiDulceNiña.id, ...s },
    });
  }

  // Content para la serie (para grillas)
  await prisma.content.upsert({
    where: { seriesId: MiDulceNiña.id },
    update: {
      name: MiDulceNiña.name,
      posterUrl: MiDulceNiña.posterUrl ?? '/posters/MiDulceNiña.png',
      rating: MiDulceNiña.rating ?? undefined,
      originalLanguageId: byCode['de'].id,
    },
    create: {
      category: 'SERIES',
      seriesId: MiDulceNiña.id,
      name: MiDulceNiña.name,
      posterUrl: MiDulceNiña.posterUrl ?? '/posters/MiDulceNiña.png',
      rating: MiDulceNiña.rating ?? undefined,
      originalLanguageId: byCode['de'].id,
    },
  });
  // =========================================================
  //                        MOVIE: INCEPTION
  // =========================================================
  const inception = await prisma.movie.upsert({
    where: { name: 'Inception' },
    update: {
      releaseYear: 2010,
      description:
        'Un ladrón que roba secretos corporativos a través de tecnología de sueños es asignado a implantar una idea en la mente de un CEO.',
      director: 'Christopher Nolan',
      protagonists: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      comentarioBM: 'Mind-blowing.',
      originalLanguageId: byCode['en'].id,
      posterUrl: '/posters/inception.jpg',
      rating: 8.8,
      genres: {
        set: [],
        connect: [
          { id: genreMap['Ciencia Ficción'].id },
          { id: genreMap['Suspenso'].id },
        ],
      },
    },
    create: {
      name: 'Inception',
      releaseYear: 2010,
      description:
        'Un ladrón que roba secretos corporativos a través de tecnología de sueños es asignado a implantar una idea en la mente de un CEO.',
      director: 'Christopher Nolan',
      protagonists: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      comentarioBM: 'Mind-blowing.',
      originalLanguageId: byCode['en'].id,
      posterUrl: '/posters/inception.jpg',
      rating: 8.8,
      genres: {
        connect: [
          { id: genreMap['Ciencia Ficción'].id },
          { id: genreMap['Suspenso'].id },
        ],
      },
    },
  });

  await prisma.content.upsert({
    where: { movieId: inception.id },
    update: {
      name: inception.name,
      posterUrl: inception.posterUrl ?? null,
      rating: inception.rating ?? undefined,
      originalLanguageId: byCode['en'].id,
    },
    create: {
      category: 'MOVIE',
      movieId: inception.id,
      name: inception.name,
      posterUrl: inception.posterUrl ?? null,
      rating: inception.rating ?? undefined,
      originalLanguageId: byCode['en'].id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
