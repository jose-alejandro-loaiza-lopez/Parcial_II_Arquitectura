import { Movie, MovieGenre } from '../models/movie.model';

/**
 * Contrato abstracto del repositorio de películas.
 *
 * @layer Domain
 */
export abstract class MovieRepository {
  /** Lista `countMovies` películas generadas. */
  abstract getAll(countMovies: number): Promise<Movie[]>;

  /** Obtiene una película por su identificador. */
  abstract getById(id: number): Promise<Movie>;

  /** Lista las películas de un género. */
  abstract getByGenre(genre: MovieGenre): Promise<Movie[]>;
}
