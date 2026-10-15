import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetAllMoviesUseCase } from './get-all-movies.usecase';

describe('GetAllMoviesUseCase', () => {
  let useCase: GetAllMoviesUseCase;

  const countMovies = 5;
  const MovieRepositoryMock: jest.Mocked<MovieRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByGenre: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetAllMoviesUseCase,
        { provide: MovieRepository, useValue: MovieRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetAllMoviesUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllMoviesUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    MovieRepositoryMock.getAll.mockReturnValue(of(MOVIES_MOCK));
    const result = await firstValueFrom(useCase.execute(countMovies));
    expect(MovieRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(MovieRepositoryMock.getAll).toHaveBeenCalledWith(countMovies);
    expect(result).toEqual(MOVIES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la búsqueda de películas';
    MovieRepositoryMock.getAll.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(countMovies))).rejects.toThrow(
      errorMessage,
    );
    expect(MovieRepositoryMock.getAll).toHaveBeenCalledWith(countMovies);
  });
});
