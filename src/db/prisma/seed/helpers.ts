import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function ensureLanguages(
  codes: readonly { code: string; name: string }[]
) {
  const map: Record<string, { id: number }> = {};
  for (const l of codes) {
    const lang = await prisma.language.upsert({
      where: { code: l.code },
      update: {},
      create: l,
    });
    map[l.code] = { id: lang.id };
  }
  return map;
}

export async function ensureGenres(names: readonly string[]) {
  const map: Record<string, { id: number }> = {};
  for (const n of names) {
    const g = await prisma.genre.upsert({
      where: { name: n },
      update: {},
      create: { name: n },
    });
    map[n] = { id: g.id };
  }
  return map;
}

type UpsertSeriesInput = {
  name: string;
  startYear: number;
  endYear?: number | null;
  description: string;
  director?: string | null;
  protagonists?: string[];
  comentarioBM?: string | null;
  lang: string;
  posterUrl?: string | null;
  rating?: number | null;
  genres: string[];
  seasons: { number: number; episodesCount: number; year?: number }[];
};

export async function upsertSeriesWithContent(
  input: UpsertSeriesInput,
  byCode: Record<string, { id: number }>,
  genreMap: Record<string, { id: number }>
) {
  const totalSeasons = input.seasons.length;
  const totalEpisodes = input.seasons.reduce((a, s) => a + s.episodesCount, 0);

  const series = await prisma.series.upsert({
    where: { name: input.name },
    update: {
      startYear: input.startYear,
      endYear: input.endYear ?? null,
      description: input.description,
      director: input.director ?? null,
      protagonists: input.protagonists ?? [],
      comentarioBM: input.comentarioBM ?? null,
      totalSeasons,
      totalEpisodes,
      originalLanguageId: byCode[input.lang].id,
      posterUrl: input.posterUrl ?? null,
      rating: input.rating ?? null,
      genres: {
        set: [],
        connect: input.genres.map((g) => ({ id: genreMap[g].id })),
      },
    },
    create: {
      name: input.name,
      startYear: input.startYear,
      endYear: input.endYear ?? null,
      description: input.description,
      director: input.director ?? null,
      protagonists: input.protagonists ?? [],
      comentarioBM: input.comentarioBM ?? null,
      totalSeasons,
      totalEpisodes,
      originalLanguageId: byCode[input.lang].id,
      posterUrl: input.posterUrl ?? null,
      rating: input.rating ?? null,
      genres: {
        connect: input.genres.map((g) => ({ id: genreMap[g].id })),
      },
    },
  });

  for (const s of input.seasons) {
    await prisma.season.upsert({
      where: { seriesId_number: { seriesId: series.id, number: s.number } },
      update: { episodesCount: s.episodesCount, year: s.year ?? null },
      create: { seriesId: series.id, ...s },
    });
  }

  await prisma.content.upsert({
    where: { seriesId: series.id },
    update: {
      name: series.name,
      posterUrl: series.posterUrl ?? null,
      rating: series.rating ?? undefined,
      originalLanguageId: byCode[input.lang].id,
    },
    create: {
      category: 'SERIES',
      seriesId: series.id,
      name: series.name,
      posterUrl: series.posterUrl ?? null,
      rating: series.rating ?? undefined,
      originalLanguageId: byCode[input.lang].id,
    },
  });
}

type UpsertMovieInput = {
  name: string;
  releaseYear: number;
  description: string;
  director?: string | null;
  protagonists?: string[];
  comentarioBM?: string | null;
  lang: string;
  posterUrl?: string | null;
  rating?: number | null;
  genres: string[];
};

export async function upsertMovieWithContent(
  input: UpsertMovieInput,
  byCode: Record<string, { id: number }>,
  genreMap: Record<string, { id: number }>
) {
  const movie = await prisma.movie.upsert({
    where: { name: input.name },
    update: {
      releaseYear: input.releaseYear,
      description: input.description,
      director: input.director ?? null,
      protagonists: input.protagonists ?? [],
      comentarioBM: input.comentarioBM ?? null,
      originalLanguageId: byCode[input.lang].id,
      posterUrl: input.posterUrl ?? null,
      rating: input.rating ?? null,
      genres: {
        set: [],
        connect: input.genres.map((g) => ({ id: genreMap[g].id })),
      },
    },
    create: {
      name: input.name,
      releaseYear: input.releaseYear,
      description: input.description,
      director: input.director ?? null,
      protagonists: input.protagonists ?? [],
      comentarioBM: input.comentarioBM ?? null,
      originalLanguageId: byCode[input.lang].id,
      posterUrl: input.posterUrl ?? null,
      rating: input.rating ?? null,
      genres: {
        connect: input.genres.map((g) => ({ id: genreMap[g].id })),
      },
    },
  });

  await prisma.content.upsert({
    where: { movieId: movie.id },
    update: {
      name: movie.name,
      posterUrl: movie.posterUrl ?? null,
      rating: movie.rating ?? undefined,
      originalLanguageId: byCode[input.lang].id,
    },
    create: {
      category: 'MOVIE',
      movieId: movie.id,
      name: movie.name,
      posterUrl: movie.posterUrl ?? null,
      rating: movie.rating ?? undefined,
      originalLanguageId: byCode[input.lang].id,
    },
  });
}
