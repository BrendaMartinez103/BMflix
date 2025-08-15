import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Idioma inglés
  const english = await prisma.language.upsert({
    where: { code: 'en' },
    update: {},
    create: {
      code: 'en',
      name: 'English',
    },
  });

  // Serie: Breaking Bad
  const breakingBad = await prisma.series.create({
    data: {
      name: 'Breaking Bad',
      startYear: 2008,
      endYear: 2013,
      description:
        'Un profesor de química se convierte en fabricante de metanfetaminas para asegurar el futuro de su familia.',
      originalLanguageId: english.id,
      posterUrl:
        'https://upload.wikimedia.org/wikipedia/en/6/61/Breaking_Bad_title_card.png',
      rating: 9.5,
    },
  });

  // Película: Inception
  const inception = await prisma.movie.create({
    data: {
      name: 'Inception',
      releaseYear: 2010,
      description:
        'Un ladrón que roba secretos corporativos a través de tecnología de sueños es asignado a implantar una idea en la mente de un CEO.',
      originalLanguageId: english.id,
      posterUrl:
        'https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg',
      rating: 8.8,
    },
  });

  // Content para la serie
  await prisma.content.create({
    data: {
      category: 'SERIES',
      seriesId: breakingBad.id,
      name: breakingBad.name,
      posterUrl: breakingBad.posterUrl,
      rating: breakingBad.rating,
      originalLanguageId: english.id,
    },
  });

  // Content para la película
  await prisma.content.create({
    data: {
      category: 'MOVIE',
      movieId: inception.id,
      name: inception.name,
      posterUrl: inception.posterUrl,
      rating: inception.rating,
      originalLanguageId: english.id,
    },
  });

  console.log('✅ Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
