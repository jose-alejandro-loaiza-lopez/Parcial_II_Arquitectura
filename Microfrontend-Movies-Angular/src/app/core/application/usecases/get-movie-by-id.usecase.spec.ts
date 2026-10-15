import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetMovieByIdUseCase } from './get-movie-by-id.usecase';

describe('GetMovieByIdUseCase', () => {
  let useCase: GetMovieByIdUseCase;

  const movieId = 1;
  const MovieRepositoryMock: jest.Mocked<MovieRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByGenre: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetMovieByIdUseCase,
        { provide: MovieRepository, useValue: MovieRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetMovieByIdUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetMovieByIdUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    MovieRepositoryMock.getById.mockReturnValue(of(MOVIES_MOCK[0]));
    const result = await firstValueFrom(useCase.execute(movieId));
    expect(MovieRepositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(MovieRepositoryMock.getById).toHaveBeenCalledWith(movieId);
    expect(result).toEqual(MOVIES_MOCK[0]);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Película no encontrada';
    MovieRepositoryMock.getById.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(movieId))).rejects.toThrow(
      errorMessage,
    );
    expect(MovieRepositoryMock.getById).toHaveBeenCalledWith(movieId);
  });
});
