import { test } from 'node:test';
import assert from 'node:assert/strict';

import { MovieDatasource } from '../src/infrastructure/datasources/movie.datasource';
import { MOVIE_GENRES } from '../src/domain/models/movie.model';

/**
 * Pruebas de la fuente de datos en memoria (datos semilla fijos).
 */

const datasource = new MovieDatasource();

test('getAll retorna la cantidad solicitada de películas con ids consecutivos', async () => {
  const movies = await datasource.getAll(10);

  assert.equal(movies.length, 10);
  movies.forEach((movie, index) => {
    assert.equal(movie.id, index + 1);
    assert.equal(typeof movie.title, 'string');
    assert.ok(MOVIE_GENRES.includes(movie.genre));
    assert.ok(movie.releaseYear >= 1970 && movie.releaseYear <= 2024);
    assert.ok(movie.rating >= 1 && movie.rating <= 10);
  });
});

test('getAll retorna el conjunto completo cuando la cantidad supera los datos semilla', async () => {
  const movies = await datasource.getAll(100);

  assert.equal(movies.length, 15);
});

test('getAll es consistente entre llamadas consecutivas', async () => {
  const first = await datasource.getAll(100);
  const second = await datasource.getAll(100);

  assert.deepEqual(first, second);
});

test('getAll con una cantidad de 1 retorna una única película', async () => {
  const movies = await datasource.getAll(1);

  assert.equal(movies.length, 1);
  assert.equal(movies[0]!.id, 1);
});

test('getById retorna la película con el id solicitado', async () => {
  const movie = await datasource.getById(7);

  assert.equal(movie.id, 7);
  assert.ok(MOVIE_GENRES.includes(movie.genre));
});

test('getById lanza un error 404 cuando el id no existe', async () => {
  await assert.rejects(() => datasource.getById(999), {
    statusCode: 404,
    message: 'No existe una película con el id 999',
  });
});

test('getByGenre retorna solo películas del género solicitado', async () => {
  const movies = await datasource.getByGenre('Ciencia Ficcion');

  assert.equal(movies.length, 3);
  movies.forEach((movie) => {
    assert.equal(movie.genre, 'Ciencia Ficcion');
  });
});

test('getByGenre retorna un subconjunto del listado completo', async () => {
  const all = await datasource.getAll(100);
  const allIds = new Set(all.map((movie) => movie.id));
  const filtered = await datasource.getByGenre('Terror');

  assert.equal(filtered.length, 3);
  filtered.forEach((movie) => {
    assert.ok(allIds.has(movie.id));
  });
});
