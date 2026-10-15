import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MOVIES_MOCK } from '../../../../mocks/movies.mocks';
import { MovieGenre } from '../../../domain/models/movie.model';
import { DataService } from '../../services/data.service';
import { MovieNodeRepositoryImpl } from './movie-node.repository.impl';

describe('MovieNodeRepositoryImpl (Infrastructure)', () => {
  let repository: MovieNodeRepositoryImpl;

  const countMovies = 5;
  const id = 1;
  const genre: MovieGenre = 'Drama';
  const DataServiceMock = {
    getAllMoviesNode: jest.fn(),
    getMovieByIdNode: jest.fn(),
    getMoviesByGenreNode: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieNodeRepositoryImpl,
        { provide: DataService, useValue: DataServiceMock },
      ],
    }).compileComponents();
    repository = TestBed.inject(MovieNodeRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar getAll a DataService.getAllMoviesNode()', (done) => {
    DataServiceMock.getAllMoviesNode.mockReturnValue(of(MOVIES_MOCK));
    repository.getAll(countMovies).subscribe((movies) => {
      expect(movies).toEqual(MOVIES_MOCK);
      expect(DataServiceMock.getAllMoviesNode).toHaveBeenCalledWith(countMovies);
      done();
    });
  });

  it('debe delegar getById a DataService.getMovieByIdNode()', (done) => {
    DataServiceMock.getMovieByIdNode.mockReturnValue(of(MOVIES_MOCK[0]));
    repository.getById(id).subscribe((movie) => {
      expect(movie).toEqual(MOVIES_MOCK[0]);
      expect(DataServiceMock.getMovieByIdNode).toHaveBeenCalledWith(id);
      done();
    });
  });

  it('debe delegar getByGenre a DataService.getMoviesByGenreNode()', (done) => {
    DataServiceMock.getMoviesByGenreNode.mockReturnValue(of(MOVIES_MOCK));
    repository.getByGenre(genre).subscribe((movies) => {
      expect(movies).toEqual(MOVIES_MOCK);
      expect(DataServiceMock.getMoviesByGenreNode).toHaveBeenCalledWith(genre);
      done();
    });
  });
});
