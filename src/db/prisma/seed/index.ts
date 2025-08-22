import { prisma, ensureLanguages, ensureGenres, upsertSeriesWithContent, upsertMovieWithContent } from '../seed/helpers';
import { languages } from '../seed/data/languages';
import { genres } from '../seed/data/genres';
import { seriesData } from '../seed/data/series';
import { moviesData } from '../seed/data/movies';

async function main() {
  const byCode = await ensureLanguages(languages);
  const genreMap = await ensureGenres(genres);

  // Series
  for (const s of seriesData) {
    await upsertSeriesWithContent(s, byCode, genreMap);
  }

  // Películas
  for (const m of moviesData) {
    await upsertMovieWithContent(m, byCode, genreMap);
  }

}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
