import { CustomError } from '../../domain/errors/custom.error';
import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso: obtener una película por su identificador.
 *
 * @layer Application
 */
export class GetMovieByIdUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: number): Promise<Movie> {
    if (!Number.isInteger(id) || id < 1) {
      throw CustomError.badRequest('id must be a positive integer');
    }
    return this.movieRepository.getById(id);
  }
}
