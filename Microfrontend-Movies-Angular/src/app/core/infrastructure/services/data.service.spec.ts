import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { Movie, MovieGenre } from '../../domain/models/movie.model';
import { DataService } from './data.service';

describe('DataService (Microfrontend Películas)', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const countMovies = 3;
  const movieId = 1;
  const genre: MovieGenre = 'Drama';
  const pathUrlNode = `${environment.baseUrl}/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('Implementación Local', () => {
    it('debe devolver el listado local de películas', (done) => {
      service.getAllMoviesLocal(countMovies).subscribe((movies: Movie[]) => {
        expect(movies.length).toEqual(countMovies);
        expect(movies[0].id).toEqual(1);
        done();
      });
    });

    it('debe devolver una película local por id', (done) => {
      service.getMovieByIdLocal(movieId).subscribe((movie: Movie) => {
        expect(movie.id).toEqual(movieId);
        done();
      });
    });

    it('debe devolver películas locales filtradas por género', (done) => {
      service.getMoviesByGenreLocal(genre).subscribe((movies: Movie[]) => {
        expect(movies.length).toBeGreaterThan(0);
        movies.forEach((movie) => expect(movie.genre).toBe(genre));
        done();
      });
    });
  });

  describe('Implementación Node', () => {
    it('debe obtener películas desde Node por HTTP', () => {
      service.getAllMoviesNode(countMovies).subscribe((movies) => {
        expect(movies).toEqual(MOVIES_MOCK);
      });
      const req = httpMock.expectOne(`${pathUrlNode}/movies/${countMovies}`);
      expect(req.request.method).toBe('GET');
      req.flush(MOVIES_MOCK);
    });

    it('debe obtener una película por id desde Node por HTTP', () => {
      service.getMovieByIdNode(movieId).subscribe((movie) => {
        expect(movie).toEqual(MOVIES_MOCK[0]);
      });
      const req = httpMock.expectOne(`${pathUrlNode}/movies/id/${movieId}`);
      expect(req.request.method).toBe('GET');
      req.flush(MOVIES_MOCK[0]);
    });

    it('debe obtener películas por género desde Node por HTTP', () => {
      service.getMoviesByGenreNode(genre).subscribe((movies) => {
        expect(movies).toEqual(MOVIES_MOCK);
      });
      const req = httpMock.expectOne(`${pathUrlNode}/movies/genre/${genre}`);
      expect(req.request.method).toBe('GET');
      req.flush(MOVIES_MOCK);
    });
  });
});
