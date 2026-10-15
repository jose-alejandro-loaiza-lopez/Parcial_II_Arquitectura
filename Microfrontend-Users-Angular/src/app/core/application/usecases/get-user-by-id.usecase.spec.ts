import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;

  const userId = 1;
  const UserRepositoryMock: jest.Mocked<UserRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByEngineering: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetUserByIdUseCase,
        { provide: UserRepository, useValue: UserRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetUserByIdUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetUserByIdUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    UserRepositoryMock.getById.mockReturnValue(of(USERS_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(userId));
    expect(UserRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.getById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(USERS_MOCK[0]);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Usuario no encontrado';
    UserRepositoryMock.getById.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(userId))).rejects.toThrow(
      errorMessage,
    );
    expect(UserRepositoryMock.getById).toHaveBeenCalledWith(userId);
  });
});
