import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { UsersController } from '../src/infrastructure/web/controllers/users.controller';
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
  getAllUsers?: unknown;
  getUserById?: unknown;
  getUsersByEngineering?: unknown;
}) {
  return new UsersController(
    (overrides.getAllUsers ?? { execute: mock.fn() }) as never,
    (overrides.getUserById ?? { execute: mock.fn() }) as never,
    (overrides.getUsersByEngineering ?? { execute: mock.fn() }) as never,
  );
}

test('getAllUsers responde 200 con el listado de usuarios', async () => {
  const users = [{ id: 1 }];
  const execute = mock.fn(async () => users);
  const controller = createController({ getAllUsers: { execute } });
  const res = createResponse();

  controller.getAllUsers(
    { params: { countUsers: '2' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, users);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [2]);
});

test('getUserById responde 200 con el usuario solicitado', async () => {
  const user = { id: 5 };
  const execute = mock.fn(async () => user);
  const controller = createController({ getUserById: { execute } });
  const res = createResponse();

  controller.getUserById(
    { params: { id: '5' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, user);
  assert.deepEqual(execute.mock.calls[0]!.arguments, [5]);
});

test('getUsersByEngineering responde 200 con los usuarios filtrados', async () => {
  const users = [{ id: 1, engineering: 'Sistemas' }];
  const execute = mock.fn(async () => users);
  const controller = createController({ getUsersByEngineering: { execute } });
  const res = createResponse();

  controller.getUsersByEngineering(
    { params: { engineering: 'Sistemas' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, users);
  assert.deepEqual(execute.mock.calls[0]!.arguments, ['Sistemas']);
});

test('responde 400 cuando el caso de uso lanza un CustomError', async (t) => {
  t.mock.method(console, 'log', () => {});
  const execute = mock.fn(async () => {
    throw CustomError.badRequest('boom');
  });
  const controller = createController({ getAllUsers: { execute } });
  const res = createResponse();

  controller.getAllUsers(
    { params: { countUsers: '0' } } as unknown as Request,
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
  const controller = createController({ getUserById: { execute } });
  const res = createResponse();

  controller.getUserById(
    { params: { id: '1' } } as unknown as Request,
    res as unknown as Response,
  );
  await flushMicrotasks();

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { error: 'Internal Server error' });
});
