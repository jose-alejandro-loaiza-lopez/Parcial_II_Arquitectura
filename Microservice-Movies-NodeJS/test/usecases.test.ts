import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

import { GetAllMoviesUseCase } from '../src/application/usecases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../src/application/usecases/get-movie-by-id.usecase';
import { GetMoviesByGenreUseCase } from '../src/application/usecases/get-movies-by-genre.usecase';
import { CustomError } from '../src/domain/errors/custom.error';
import { MovieGenre } from '../src/domain/models/movie.model';

/**
 * Pruebas de la capa de Aplicación (casos de uso).
 */

function createRepositoryMock() {
  return {
    getAll: mock.fn(async (countMovies: number) => [{ id: countMovies }]),
    getById: mock.fn(async (id: number) => ({ id })),
    getByGenre: mock.fn(async (genre: string) => [{ genre }]),
  };
}

test('GetAllMoviesUseCase delega en el repositorio con la cantidad solicitada', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetAllMoviesUseCase(repository as never);

  const movies = await useCase.execute(10);

  assert.deepEqual(movies, [{ id: 10 }]);
  assert.deepEqual(repository.getAll.mock.calls[0]!.arguments, [10]);
});

test('GetAllMoviesUseCase rechaza cantidades inválidas con 400', async () => {
  const useCase = new GetAllMoviesUseCase(createRepositoryMock() as never);

  for (const invalid of [0, -3, 2.5, NaN, 101]) {
    await assert.rejects(
      useCase.execute(invalid),
      (error: unknown) =>
        error instanceof CustomError && error.statusCode === 400,
    );
  }
});

test('GetMovieByIdUseCase delega en el repositorio con el id solicitado', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetMovieByIdUseCase(repository as never);

  const movie = await useCase.execute(7);

  assert.deepEqual(movie, { id: 7 });
  assert.deepEqual(repository.getById.mock.calls[0]!.arguments, [7]);
});

test('GetMovieByIdUseCase rechaza ids inválidos con 400', async () => {
  const useCase = new GetMovieByIdUseCase(createRepositoryMock() as never);

  for (const invalid of [0, -1, 3.3, NaN]) {
    await assert.rejects(
      useCase.execute(invalid),
      (error: unknown) =>
        error instanceof CustomError && error.statusCode === 400,
    );
  }
});

test('GetMoviesByGenreUseCase delega en el repositorio con el género', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetMoviesByGenreUseCase(repository as never);

  const movies = await useCase.execute('Drama');

  assert.deepEqual(movies, [{ genre: 'Drama' }]);
  assert.deepEqual(repository.getByGenre.mock.calls[0]!.arguments, ['Drama']);
});

test('GetMoviesByGenreUseCase acepta todos los géneros válidos', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetMoviesByGenreUseCase(repository as never);
  const genres: MovieGenre[] = [
    'Accion',
    'Comedia',
    'Drama',
    'Terror',
    'Ciencia Ficcion',
  ];

  for (const genre of genres) {
    const movies = await useCase.execute(genre);
    assert.deepEqual(movies, [{ genre }]);
  }
});

test('GetMoviesByGenreUseCase rechaza géneros inválidos con 400', async () => {
  const useCase = new GetMoviesByGenreUseCase(createRepositoryMock() as never);

  await assert.rejects(
    useCase.execute('Musical' as MovieGenre),
    (error: unknown) =>
      error instanceof CustomError && error.statusCode === 400,
  );
});
