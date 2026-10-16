import { Request, Response } from 'express';
import { GetAllMoviesUseCase } from '../../../application/usecases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../../../application/usecases/get-movie-by-id.usecase';
import { GetMoviesByGenreUseCase } from '../../../application/usecases/get-movies-by-genre.usecase';
import { MovieGenre } from '../../../domain/models/movie.model';
import { HandleError } from '../errors/handle.error';

/**
 * Controlador HTTP del microservicio de películas.
 *
 * @layer Infrastructure (Frameworks & Drivers)
 */
export class MoviesController {
  constructor(
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
    private readonly getMoviesByGenreUseCase: GetMoviesByGenreUseCase,
  ) {}

  getAllMovies = (req: Request, res: Response): void => {
    const { countMovies } = req.params;
    this.getAllMoviesUseCase
      .execute(Number(countMovies))
      .then((movies) => res.json(movies))
      .catch((error) => HandleError.error(error, res));
  };

  getMovieById = (req: Request, res: Response): void => {
    const { id } = req.params;
    this.getMovieByIdUseCase
      .execute(Number(id))
      .then((movie) => res.json(movie))
      .catch((error) => HandleError.error(error, res));
  };

  getMoviesByGenre = (req: Request, res: Response): void => {
    const { genre } = req.params;
    this.getMoviesByGenreUseCase
      .execute(genre as MovieGenre)
      .then((movies) => res.json(movies))
      .catch((error) => HandleError.error(error, res));
  };
}
