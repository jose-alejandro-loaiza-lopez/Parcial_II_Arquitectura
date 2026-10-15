import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MovieGenre } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { GetMoviesByGenreUseCase } from './get-movies-by-genre.usecase';

describe('GetMoviesByGenreUseCase', () => {
  let useCase: GetMoviesByGenreUseCase;

  const genre: MovieGenre = 'Drama';
  const MovieRepositoryMock: jest.Mocked<MovieRepository> = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getByGenre: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        GetMoviesByGenreUseCase,
        { provide: MovieRepository, useValue: MovieRepositoryMock },
      ],
    }).compileComponents();
    useCase = TestBed.inject(GetMoviesByGenreUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetMoviesByGenreUseCase);
  });

  it('debería delegar la llamada al repositorio', async () => {
    MovieRepositoryMock.getByGenre.mockReturnValue(of(MOVIES_MOCK));
    const result = await firstValueFrom(useCase.execute(genre));
    expect(MovieRepositoryMock.getByGenre).toHaveBeenCalledTimes(1);
    expect(MovieRepositoryMock.getByGenre).toHaveBeenCalledWith(genre);
    expect(result).toEqual(MOVIES_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo el filtrado de películas';
    MovieRepositoryMock.getByGenre.mockReturnValue(
      throwError(() => new Error(errorMessage)),
    );
    await expect(firstValueFrom(useCase.execute(genre))).rejects.toThrow(
      errorMessage,
    );
    expect(MovieRepositoryMock.getByGenre).toHaveBeenCalledWith(genre);
  });
});
