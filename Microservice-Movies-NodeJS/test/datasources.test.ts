import { test } from 'node:test';
import assert from 'node:assert/strict';

import { MovieDatasource } from '../src/infrastructure/datasources/movie.datasource';
import { MOVIE_GENRES } from '../src/domain/models/movie.model';

/**
 * Pruebas de la fuente de datos simulada (faker).
 */

const datasource = new MovieDatasource();

test('getAll genera la cantidad solicitada de películas con ids consecutivos', async () => {
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

test('getAll con una cantidad de 1 retorna una única película', async () => {
  const movies = await datasource.getAll(1);

  assert.equal(movies.length, 1);
  assert.equal(movies[0]!.id, 1);
});

test('getById retorna una película con el id solicitado', async () => {
  const movie = await datasource.getById(7);

  assert.equal(movie.id, 7);
  assert.ok(MOVIE_GENRES.includes(movie.genre));
});

test('getByGenre retorna películas solo del género solicitado', async () => {
  const movies = await datasource.getByGenre('Ciencia Ficcion');

  assert.equal(movies.length, 5);
  movies.forEach((movie) => {
    assert.equal(movie.genre, 'Ciencia Ficcion');
  });
});
