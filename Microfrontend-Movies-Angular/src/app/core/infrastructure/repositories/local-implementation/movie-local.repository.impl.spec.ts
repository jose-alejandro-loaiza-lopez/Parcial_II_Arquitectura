import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MOVIES_MOCK } from '../../../../mocks/movies.mocks';
import { MovieGenre } from '../../../domain/models/movie.model';
import { DataService } from '../../services/data.service';
import { MovieLocalRepositoryImpl } from './movie-local.repository.impl';

describe('MovieLocalRepositoryImpl (Infrastructure)', () => {
  let repository: MovieLocalRepositoryImpl;

  const countMovies = 5;
  const id = 1;
  const genre: MovieGenre = 'Drama';
  const DataServiceMock = {
    getAllMoviesLocal: jest.fn(),
    getMovieByIdLocal: jest.fn(),
    getMoviesByGenreLocal: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieLocalRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock },
      ],
    }).compileComponents();
    repository = TestBed.inject(MovieLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll a DataService.getAllMoviesLocal()', (done) => {
    DataServiceMock.getAllMoviesLocal.mockReturnValue(of(MOVIES_MOCK));
    repository.getAll(countMovies).subscribe((movies) => {
      expect(movies).toEqual(MOVIES_MOCK);
      expect(DataServiceMock.getAllMoviesLocal).toHaveBeenCalledWith(countMovies);
      done();
    });
  });

  it('debe delegar getById a DataService.getMovieByIdLocal()', (done) => {
    DataServiceMock.getMovieByIdLocal.mockReturnValue(of(MOVIES_MOCK[0]));
    repository.getById(id).subscribe((movie) => {
      expect(movie).toEqual(MOVIES_MOCK[0]);
      expect(DataServiceMock.getMovieByIdLocal).toHaveBeenCalledWith(id);
      done();
    });
  });

  it('debe delegar getByGenre a DataService.getMoviesByGenreLocal()', (done) => {
    DataServiceMock.getMoviesByGenreLocal.mockReturnValue(of(MOVIES_MOCK));
    repository.getByGenre(genre).subscribe((movies) => {
      expect(movies).toEqual(MOVIES_MOCK);
      expect(DataServiceMock.getMoviesByGenreLocal).toHaveBeenCalledWith(genre);
      done();
    });
  });
});
