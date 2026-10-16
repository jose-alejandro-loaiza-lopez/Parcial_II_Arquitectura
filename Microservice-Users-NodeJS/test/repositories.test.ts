import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

import { UserRepositoryImpl } from '../src/infrastructure/repositories/user.repository.impl';

/**
 * Pruebas del repositorio de infraestructura (delegación al datasource).
 */

function createDatasourceMock() {
  return {
    getAll: mock.fn(async (countUsers: number) => [{ id: countUsers }]),
    getById: mock.fn(async (id: number) => ({ id })),
    getByEngineering: mock.fn(async (engineering: string) => [
      { engineering },
    ]),
  };
}

test('UserRepositoryImpl.getAll delega en el datasource', async () => {
  const datasource = createDatasourceMock();
  const repository = new UserRepositoryImpl(datasource as never);

  const users = await repository.getAll(4);

  assert.deepEqual(users, [{ id: 4 }]);
  assert.deepEqual(datasource.getAll.mock.calls[0]!.arguments, [4]);
});

test('UserRepositoryImpl.getById delega en el datasource', async () => {
  const datasource = createDatasourceMock();
  const repository = new UserRepositoryImpl(datasource as never);

  const user = await repository.getById(2);

  assert.deepEqual(user, { id: 2 });
  assert.deepEqual(datasource.getById.mock.calls[0]!.arguments, [2]);
});

test('UserRepositoryImpl.getByEngineering delega en el datasource', async () => {
  const datasource = createDatasourceMock();
  const repository = new UserRepositoryImpl(datasource as never);

  const users = await repository.getByEngineering('Industrial');

  assert.deepEqual(users, [{ engineering: 'Industrial' }]);
  assert.deepEqual(datasource.getByEngineering.mock.calls[0]!.arguments, [
    'Industrial',
  ]);
});
