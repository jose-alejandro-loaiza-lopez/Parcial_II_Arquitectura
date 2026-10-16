import { test } from 'node:test';
import assert from 'node:assert/strict';

import { UserDatasource } from '../src/infrastructure/datasources/user.datasource';
import { USER_ENGINEERINGS } from '../src/domain/models/user.model';

/**
 * Pruebas de la fuente de datos simulada (faker).
 */

const datasource = new UserDatasource();

test('getAll genera la cantidad solicitada de usuarios con ids consecutivos', async () => {
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

test('getAll con una cantidad de 1 retorna un único usuario', async () => {
  const users = await datasource.getAll(1);

  assert.equal(users.length, 1);
  assert.equal(users[0]!.id, 1);
});

test('getById retorna un usuario con el id solicitado', async () => {
  const user = await datasource.getById(7);

  assert.equal(user.id, 7);
  assert.ok(USER_ENGINEERINGS.includes(user.engineering));
});

test('getByEngineering retorna usuarios solo de la ingeniería solicitada', async () => {
  const users = await datasource.getByEngineering('Biomedica');

  assert.equal(users.length, 5);
  users.forEach((user) => {
    assert.equal(user.engineering, 'Biomedica');
  });
});
