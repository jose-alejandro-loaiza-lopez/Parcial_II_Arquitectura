import { Movie, MovieGenre } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { MovieDatasource } from '../datasources/movie.datasource';

/**
 * Implementación del contrato `MovieRepository` sobre la fuente de
 * datos simulada.
 *
 * @layer Infrastructure
 */
export class MovieRepositoryImpl extends MovieRepository {
  constructor(private readonly datasource: MovieDatasource) {
    super();
  }

  getAll(countMovies: number): Promise<Movie[]> {
    return this.datasource.getAll(countMovies);
  }

  getById(id: number): Promise<Movie> {
    return this.datasource.getById(id);
  }

  getByGenre(genre: MovieGenre): Promise<Movie[]> {
    return this.datasource.getByGenre(genre);
  }
}
