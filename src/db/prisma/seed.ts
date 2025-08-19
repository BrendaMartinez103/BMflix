import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ---------- Languages ----------
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
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
  const genres = ['Drama', 'Crimen', 'Ciencia Ficción', 'Suspenso', 'Thriller', 'Policial'];
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
