import { test, mock } from 'node:test';
import assert from 'node:assert/strict';

import { GetAllUsersUseCase } from '../src/application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../src/application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../src/application/usecases/get-users-by-engineering.usecase';
import { CustomError } from '../src/domain/errors/custom.error';
import { UserEngineering } from '../src/domain/models/user.model';

/**
 * Pruebas de la capa de Aplicación (casos de uso).
 */

function createRepositoryMock() {
  return {
    getAll: mock.fn(async (countUsers: number) => [{ id: countUsers }]),
    getById: mock.fn(async (id: number) => ({ id })),
    getByEngineering: mock.fn(async (engineering: string) => [
      { engineering },
    ]),
  };
}

test('GetAllUsersUseCase delega en el repositorio con la cantidad solicitada', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetAllUsersUseCase(repository as never);

  const users = await useCase.execute(10);

  assert.deepEqual(users, [{ id: 10 }]);
  assert.deepEqual(repository.getAll.mock.calls[0]!.arguments, [10]);
});

test('GetAllUsersUseCase rechaza cantidades inválidas con 400', async () => {
  const useCase = new GetAllUsersUseCase(createRepositoryMock() as never);

  for (const invalid of [0, -3, 1.5, NaN, 101]) {
    await assert.rejects(
      useCase.execute(invalid),
      (error: unknown) =>
        error instanceof CustomError && error.statusCode === 400,
    );
  }
});

test('GetUserByIdUseCase delega en el repositorio con el id solicitado', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetUserByIdUseCase(repository as never);

  const user = await useCase.execute(7);

  assert.deepEqual(user, { id: 7 });
  assert.deepEqual(repository.getById.mock.calls[0]!.arguments, [7]);
});

test('GetUserByIdUseCase rechaza ids inválidos con 400', async () => {
  const useCase = new GetUserByIdUseCase(createRepositoryMock() as never);

  for (const invalid of [0, -1, 2.5, NaN]) {
    await assert.rejects(
      useCase.execute(invalid),
      (error: unknown) =>
        error instanceof CustomError && error.statusCode === 400,
    );
  }
});

test('GetUsersByEngineeringUseCase delega en el repositorio con la ingeniería', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetUsersByEngineeringUseCase(repository as never);

  const users = await useCase.execute('Sistemas');

  assert.deepEqual(users, [{ engineering: 'Sistemas' }]);
  assert.deepEqual(repository.getByEngineering.mock.calls[0]!.arguments, [
    'Sistemas',
  ]);
});

test('GetUsersByEngineeringUseCase acepta todas las ingenierías válidas', async () => {
  const repository = createRepositoryMock();
  const useCase = new GetUsersByEngineeringUseCase(repository as never);
  const engineerings: UserEngineering[] = [
    'Sistemas',
    'Electronica',
    'Biomedica',
    'Industrial',
    'Ambiental',
  ];

  for (const engineering of engineerings) {
    const users = await useCase.execute(engineering);
    assert.deepEqual(users, [{ engineering }]);
  }
});

test('GetUsersByEngineeringUseCase rechaza ingenierías inválidas con 400', async () => {
  const useCase = new GetUsersByEngineeringUseCase(
    createRepositoryMock() as never,
  );

  await assert.rejects(
    useCase.execute('Mecanica' as UserEngineering),
    (error: unknown) =>
      error instanceof CustomError && error.statusCode === 400,
  );
});
