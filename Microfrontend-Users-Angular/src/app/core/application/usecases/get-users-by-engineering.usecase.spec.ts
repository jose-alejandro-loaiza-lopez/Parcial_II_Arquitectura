import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { USERS_MOCK } from '../../../mocks/users.mocks';
import { UserEngineering } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import { GetUsersByEngineeringUseCase } from './get-users-by-engineering.usecase';

describe('GetUsersByEngineeringUseCase', () => {
  let useCase: GetUsersByEngineeringUseCase;

  const engineering: UserEngineering = 'Sistemas';
  const UserRepositoryMock: jest.Mocked<UserRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByEngineering: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetUsersByEngineeringUseCase,
        { provide: UserRepository, useValue: UserRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetUsersByEngineeringUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetUsersByEngineeringUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    UserRepositoryMock.getByEngineering.mockReturnValue(of(USERS_MOCK));
    const result = await firstValueFrom(useCase.execute(engineering));
    expect(UserRepositoryMock.getByEngineering).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.getByEngineering).toHaveBeenCalledWith(engineering);
    expect(result).toEqual(USERS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo el filtrado de usuarios';
    UserRepositoryMock.getByEngineering.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(engineering))).rejects.toThrow(
      errorMessage,
    );
    expect(UserRepositoryMock.getByEngineering).toHaveBeenCalledWith(engineering);
  });
});
