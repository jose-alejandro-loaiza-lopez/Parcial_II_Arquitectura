/**
 * Entidad de dominio que representa una película.
 *
 * @layer Domain
 */
export interface Movie {
  /** Identificador único de la película */
  id: number;

  /** Título de la película */
  title: string;

  /** Género cinematográfico de la película */
  genre: MovieGenre;

  /** Año en el que se estrenó la película */
  releaseYear: number;

  /** Calificación de la película (escala de 1 a 10) */
  rating: number;
}

/**
 * Géneros cinematográficos válidos.
 *
 * @layer Domain
 */
export type MovieGenre =
  | 'Accion'
  | 'Comedia'
  | 'Drama'
  | 'Terror'
  | 'Ciencia Ficcion';

/**
 * Lista de géneros válidos, usada para la generación de datos
 * y para la validación del filtrado.
 */
export const MOVIE_GENRES: readonly MovieGenre[] = [
  'Accion',
  'Comedia',
  'Drama',
  'Terror',
  'Ciencia Ficcion',
];
