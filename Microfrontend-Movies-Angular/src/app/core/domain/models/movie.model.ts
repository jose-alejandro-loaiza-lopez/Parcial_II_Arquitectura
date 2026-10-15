/**
 * Interfaz que representa una película del sistema.
 *
 * Contiene la información básica necesaria para mostrar una película
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada película debe tener un `id` único, un `title` descriptivo, un
 * `genre` válido, un `releaseYear` y una `rating` (calificación).
 *
 * @example
 * ```ts
 * const pelicula: Movie = {
 *   id: 1,
 *   title: 'El Padrino',
 *   genre: 'Drama',
 *   releaseYear: 1972,
 *   rating: 9.2
 * };
 * ```
 *
 * @architecture Clean Architecture
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

  /** Calificación de la película (escala de 0 a 10) */
  rating: number;
}

/**
 * Tipo de género cinematográfico.
 *
 * @remarks
 * Restringe los géneros a los valores predefinidos. Se utiliza
 * principalmente para mapear *badges* de color en la UI y como
 * criterio del caso de uso de filtrado.
 */
export type MovieGenre =
  | 'Accion'
  | 'Comedia'
  | 'Drama'
  | 'Terror'
  | 'Ciencia Ficcion';
