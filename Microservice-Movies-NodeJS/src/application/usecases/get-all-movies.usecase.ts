import { CustomError } from '../../domain/errors/custom.error';
import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso: listar todas las películas.
 *
 * Valida que la cantidad solicitada sea un entero entre 1 y 100.
 *
 * @layer Application
 */
export class GetAllMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(countMovies: number): Promise<Movie[]> {
    if (!Number.isInteger(countMovies) || countMovies < 1 || countMovies > 100) {
      throw CustomError.badRequest(
        'countMovies must be an integer between 1 and 100',
      );
    }
    return this.movieRepository.getAll(countMovies);
  }
}
