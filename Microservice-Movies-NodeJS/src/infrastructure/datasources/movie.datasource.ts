import { faker } from '@faker-js/faker';
import { Movie, MOVIE_GENRES, MovieGenre } from '../../domain/models/movie.model';

/**
 * Fuente de datos simulada del microservicio de películas.
 *
 * @remarks
 * Genera películas aleatorias con `faker`, manteniendo la forma del
 * modelo de dominio `Movie`.
 *
 * @layer Infrastructure
 */
export class MovieDatasource {
  /** Cantidad de películas generadas en los filtrados. */
  private static readonly FILTERED_COUNT = 5;

  /** Lista `countMovies` películas con ids consecutivos. */
  async getAll(countMovies: number): Promise<Movie[]> {
    const movies: Movie[] = [];
    for (let id = 1; id <= countMovies; id++) {
      movies.push(this.generateMovie(id));
    }
    return movies;
  }

  /** Genera una única película con el id solicitado. */
  async getById(id: number): Promise<Movie> {
    return this.generateMovie(id);
  }

  /** Lista películas del género solicitado. */
  async getByGenre(genre: MovieGenre): Promise<Movie[]> {
    const movies: Movie[] = [];
    for (let id = 1; id <= MovieDatasource.FILTERED_COUNT; id++) {
      movies.push({ ...this.generateMovie(id), genre });
    }
    return movies;
  }

  /** Construye una película aleatoria a partir de un id. */
  private generateMovie(id: number): Movie {
    return {
      id,
      title: faker.lorem.words(3),
      genre: faker.helpers.arrayElement([...MOVIE_GENRES]),
      releaseYear: faker.number.int({ min: 1970, max: 2024 }),
      rating: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
    };
  }
}
