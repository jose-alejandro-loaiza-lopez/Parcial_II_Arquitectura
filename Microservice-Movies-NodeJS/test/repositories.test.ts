import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

import { MovieRepositoryImpl } from '../src/infrastructure/repositories/movie.repository.impl';

/**
 * Pruebas del repositorio de infraestructura (delegación al datasource).
 */

function createDatasourceMock() {
  return {
    getAll: mock.fn(async (countMovies: number) => [{ id: countMovies }]),
    getById: mock.fn(async (id: number) => ({ id })),
    getByGenre: mock.fn(async (genre: string) => [{ genre }]),
  };
}

test('MovieRepositoryImpl.getAll delega en el datasource', async () => {
  const datasource = createDatasourceMock();
  const repository = new MovieRepositoryImpl(datasource as never);

  const movies = await repository.getAll(4);

  assert.deepEqual(movies, [{ id: 4 }]);
  assert.deepEqual(datasource.getAll.mock.calls[0]!.arguments, [4]);
});

test('MovieRepositoryImpl.getById delega en el datasource', async () => {
  const datasource = createDatasourceMock();
  const repository = new MovieRepositoryImpl(datasource as never);

  const movie = await repository.getById(2);

  assert.deepEqual(movie, { id: 2 });
  assert.deepEqual(datasource.getById.mock.calls[0]!.arguments, [2]);
});

test('MovieRepositoryImpl.getByGenre delega en el datasource', async () => {
  const datasource = createDatasourceMock();
  const repository = new MovieRepositoryImpl(datasource as never);

  const movies = await repository.getByGenre('Terror');

  assert.deepEqual(movies, [{ genre: 'Terror' }]);
  assert.deepEqual(datasource.getByGenre.mock.calls[0]!.arguments, ['Terror']);
});
