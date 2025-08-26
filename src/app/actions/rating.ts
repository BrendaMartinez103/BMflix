'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getOrSetClientId } from '@/lib/client-id';

export async function rateContent(formData: FormData) {
  const contentId = Number(formData.get('id'));
  const score = Number(formData.get('rating'));
  if (!contentId || Number.isNaN(score) || score < 1 || score > 10) return;

  const clientId = await getOrSetClientId();

  // guarda/actualiza el voto del visitante
  await prisma.rating.upsert({
    where: { contentId_clientId: { contentId, clientId } },
    update: { score },
    create: { contentId, clientId, score },
  });

  // promedio actualizado
  const avg = await prisma.rating.aggregate({
    where: { contentId },
    _avg: { score: true },
  });

  const updated = await prisma.content.update({
    where: { id: contentId },
    data: { rating: avg._avg.score ?? null },
    select: { category: true, movieId: true, seriesId: true },
  });

  revalidatePath('/peliculas-series');
  if (updated.category === 'MOVIE' && updated.movieId) {
    revalidatePath(`/peliculas/${updated.movieId}`, 'page');
  }
  if (updated.category === 'SERIES' && updated.seriesId) {
    revalidatePath(`/series/${updated.seriesId}`, 'page');
  }
}
