import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { MoviesController } from '../src/infrastructure/web/controllers/movies.controller';
import { CustomError } from '../src/domain/errors/custom.error';

/**
 * Pruebas de la capa de Frameworks & Drivers (controlador HTTP).
 */

function createResponse() {
  return {
    statusCode: undefined as number | undefined,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.statusCode ??= 200;
      this.body = payload;
      return this;
    },
  };
}

const flushMicrotasks = () =>
  new Promise<void>((resolve) => setImmediate(resolve));

function createController(overrides: {
  getAllMovies?: unknown;
  getMovieById?: unknown;
  getMoviesByGenre?: unknown;
}) {
  return new MoviesController(
    (overrides.getAllMovies ?? { execute: mock.fn() }) as never,
    (overrides.getMovieById ?? { execute: mock.fn() }) as never,
    (overrides.getMoviesByGenre ?? { execute: mock.fn() }) as never,
  );
}

test('getAllMovies responde 200 con el listado de películas', async () => {
  const movies = [{ id: 1 }];
  const execute = mock.fn(async () => movies);
  const controller = createController({ getAllMovies: { execute } });
  const res = createResponse();

  controller.getAllMovies(
    { params: { countMovies: '2' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, movies);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [2]);
});

test('getMovieById responde 200 con la película solicitada', async () => {
  const movie = { id: 5 };
  const execute = mock.fn(async () => movie);
  const controller = createController({ getMovieById: { execute } });
  const res = createResponse();

  controller.getMovieById(
    { params: { id: '5' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, movie);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [5]);
});

test('getMoviesByGenre responde 200 con las películas filtradas', async () => {
  const movies = [{ id: 1, genre: 'Drama' }];
  const execute = mock.fn(async () => movies);
  const controller = createController({ getMoviesByGenre: { execute } });
  const res = createResponse();

  controller.getMoviesByGenre(
    { params: { genre: 'Drama' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, movies);
  assert.deepEqual(execute.mock.calls[0]!.arguments, ['Drama']);
});

test('responde 400 cuando el caso de uso lanza un CustomError', async (t) => {
  t.mock.method(console, 'log', () => {});
  const execute = mock.fn(async () => {
    throw CustomError.badRequest('boom');
  });
  const controller = createController({ getAllMovies: { execute } });
  const res = createResponse();

  controller.getAllMovies(
    { params: { countMovies: '0' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { error: 'boom' });
});

test('responde 500 ante errores no controlados', async (t) => {
  t.mock.method(console, 'log', () => {});
  const execute = mock.fn(async () => {
    throw new Error('inesperado');
  });
  const controller = createController({ getMovieById: { execute } });
  const res = createResponse();

  controller.getMovieById(
    { params: { id: '1' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { error: 'Internal Server error' });
});
