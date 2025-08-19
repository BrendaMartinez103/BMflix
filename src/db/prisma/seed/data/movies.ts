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
    name: 'Inception',
    releaseYear: 2010,
    description:
      'Un ladrón que roba secretos corporativos a través de tecnología de sueños es asignado a implantar una idea en la mente de un CEO.',
    director: 'Christopher Nolan',
    protagonists: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    comentarioBM: 'Mind-blowing.',
    lang: 'en',
    posterUrl: '/posters/inception.jpg',
    rating: 8.8,
    genres: ['Ciencia Ficción', 'Suspenso'],
  },
];
