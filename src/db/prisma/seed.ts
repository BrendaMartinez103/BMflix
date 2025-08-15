import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
 const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ko', name: '한국어' },       // coreano
  { code: 'ch', name: '中文' },        // chino
];
const byCode: Record<string, { id: number }> = {};

for (const l of languages) {
  const lang = await prisma.language.upsert({
    where: { code: l.code }, update: {}, create: l,
  });
  byCode[l.code] = { id: lang.id };
}
//------------------ SERIES ------------------
  const BreakingBad = await prisma.series.create({
    data: {
      name: 'Breaking Bad',
      startYear: 2008,
      endYear: 2013,
      description:
        'Un profesor de química con problemas económicos a quien le diagnostican un cáncer de pulmón inoperable. Para pagar su tratamiento y asegurar el futuro económico de su familia, comienza a cocinar y vender metanfetamina',
      originalLanguageId: byCode['en'].id, 
      posterUrl: '/posters/breaking-bad.png',
      rating: 9.5,
    },
  });

    await prisma.content.create({
    data: {
      category: 'SERIES',
      seriesId: BreakingBad.id,
      name: BreakingBad.name,
      posterUrl: BreakingBad.posterUrl,
      rating: BreakingBad.rating,
      originalLanguageId: byCode['en'].id, 
    },
  });

//------------------ PELICULAS ------------------
  const inception = await prisma.movie.create({
    data: {
      name: 'Inception',
      releaseYear: 2010,
      description:
        'Un ladrón que roba secretos corporativos a través de tecnología de sueños es asignado a implantar una idea en la mente de un CEO.',
      originalLanguageId: byCode['en'].id, 
      posterUrl: null,
      rating: 8.8,
    },
  });

    await prisma.content.create({
    data: {
      category: 'MOVIE',
      movieId: inception.id,
      name: inception.name,
      posterUrl: inception.posterUrl,
      rating: inception.rating,
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
