import { GetAllMoviesUseCase } from '../application/usecases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../application/usecases/get-movie-by-id.usecase';
import { GetMoviesByGenreUseCase } from '../application/usecases/get-movies-by-genre.usecase';
import { MovieDatasource } from '../infrastructure/datasources/movie.datasource';
import { MovieRepositoryImpl } from '../infrastructure/repositories/movie.repository.impl';
import { MoviesController } from '../infrastructure/web/controllers/movies.controller';

/**
 * Contenedor de inyección de dependencias (Composition Root).
 *
 * @remarks
 * Ensambla manualmente las capas de infraestructura, dominio y
 * aplicación: `Datasource -> Repository -> UseCase -> Controller`.
 */
export class Container {
  //* Datasources (Infrastructure)
  private static readonly movieDatasource = new MovieDatasource();

  //* Repositories (Infrastructure -> Domain)
  private static readonly movieRepository = new MovieRepositoryImpl(
    Container.movieDatasource,
  );

  //* Use cases (Application)
  private static readonly getAllMoviesUseCase = new GetAllMoviesUseCase(
    Container.movieRepository,
  );

  private static readonly getMovieByIdUseCase = new GetMovieByIdUseCase(
    Container.movieRepository,
  );

  private static readonly getMoviesByGenreUseCase = new GetMoviesByGenreUseCase(
    Container.movieRepository,
  );

  //* Controllers (Frameworks & Drivers)
  static readonly moviesController = new MoviesController(
    Container.getAllMoviesUseCase,
    Container.getMovieByIdUseCase,
    Container.getMoviesByGenreUseCase,
  );
}
