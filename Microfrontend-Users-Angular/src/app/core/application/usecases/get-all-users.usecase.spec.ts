import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetAllUsersUseCase } from './get-all-users.usecase';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;

  const countUsers = 5;
  const UserRepositoryMock: jest.Mocked<UserRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByEngineering: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllUsersUseCase,
        { provide: UserRepository, useValue: UserRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetAllUsersUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllUsersUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    UserRepositoryMock.getAll.mockReturnValue(of(USERS_MOCK));
    const result = await firstValueFrom(useCase.execute(countUsers));
    expect(UserRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.getAll).toHaveBeenCalledWith(countUsers);
    expect(result).toEqual(USERS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la búsqueda de usuarios';
    UserRepositoryMock.getAll.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(countUsers))).rejects.toThrow(
      errorMessage,
    );
    expect(UserRepositoryMock.getAll).toHaveBeenCalledWith(countUsers);
  });
});
