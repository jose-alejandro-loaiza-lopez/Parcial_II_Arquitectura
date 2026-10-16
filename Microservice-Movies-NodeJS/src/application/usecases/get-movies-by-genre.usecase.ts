import { CustomError } from '../../domain/errors/custom.error';
import {
  Movie,
  MOVIE_GENRES,
  MovieGenre,
} from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso: listar las películas de un género.
 *
 * Valida que el género recibido pertenezca a los permitidos por el
 * dominio.
 *
 * @layer Application
 */
export class GetMoviesByGenreUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(genre: MovieGenre): Promise<Movie[]> {
    if (!MOVIE_GENRES.includes(genre)) {
      throw CustomError.badRequest(
        `genre must be one of: ${MOVIE_GENRES.join(', ')}`,
      );
    }
    return this.movieRepository.getByGenre(genre);
  }
}
