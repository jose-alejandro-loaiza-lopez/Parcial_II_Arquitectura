import { test } from 'node:test';
import assert from 'node:assert/strict';

import { UserDatasource } from '../src/infrastructure/datasources/user.datasource';
import { USER_ENGINEERINGS } from '../src/domain/models/user.model';

/**
 * Pruebas de la fuente de datos en memoria (datos semilla fijos).
 */

const datasource = new UserDatasource();

test('getAll retorna la cantidad solicitada de usuarios con ids consecutivos', async () => {
  const users = await datasource.getAll(10);

  assert.equal(users.length, 10);
  users.forEach((user, index) => {
    assert.equal(user.id, index + 1);
    assert.equal(typeof user.name, 'string');
    assert.equal(typeof user.lastName, 'string');
    assert.ok(user.age >= 18 && user.age <= 65);
    assert.equal(typeof user.email, 'string');
    assert.ok(USER_ENGINEERINGS.includes(user.engineering));
  });
});

test('getAll retorna el conjunto completo cuando la cantidad supera los datos semilla', async () => {
  const users = await datasource.getAll(100);

  assert.equal(users.length, 20);
});

test('getAll es consistente entre llamadas consecutivas', async () => {
  const first = await datasource.getAll(100);
  const second = await datasource.getAll(100);

  assert.deepEqual(first, second);
});

test('getAll con una cantidad de 1 retorna un único usuario', async () => {
  const users = await datasource.getAll(1);

  assert.equal(users.length, 1);
  assert.equal(users[0]!.id, 1);
});

test('getById retorna el usuario con el id solicitado', async () => {
  const user = await datasource.getById(7);

  assert.equal(user.id, 7);
  assert.ok(USER_ENGINEERINGS.includes(user.engineering));
});

test('getById lanza un error 404 cuando el id no existe', async () => {
  await assert.rejects(() => datasource.getById(999), {
    statusCode: 404,
    message: 'No existe un usuario con el id 999',
  });
});

test('getByEngineering retorna solo usuarios de la ingeniería solicitada', async () => {
  const users = await datasource.getByEngineering('Biomedica');

  assert.equal(users.length, 4);
  users.forEach((user) => {
    assert.equal(user.engineering, 'Biomedica');
  });
});

test('getByEngineering retorna un subconjunto del listado completo', async () => {
  const all = await datasource.getAll(100);
  const allIds = new Set(all.map((user) => user.id));
  const filtered = await datasource.getByEngineering('Industrial');

  assert.equal(filtered.length, 4);
  filtered.forEach((user) => {
    assert.ok(allIds.has(user.id));
  });
});
