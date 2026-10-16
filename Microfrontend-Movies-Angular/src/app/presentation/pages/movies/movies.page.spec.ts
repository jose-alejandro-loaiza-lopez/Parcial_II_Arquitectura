import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllMoviesUseCase } from '../../../core/application/usecases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../../../core/application/usecases/get-movie-by-id.usecase';
import { GetMoviesByGenreUseCase } from '../../../core/application/usecases/get-movies-by-genre.usecase';
import { MOVIES_MOCK } from '../../../mocks/movies.mocks';
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';
import { MoviesPage } from './movies.page';

describe('MoviesPage (Microfrontend Películas)', () => {
  let component: MoviesPage;
  let fixture: ComponentFixture<MoviesPage>;

  const GetAllMoviesUseCaseMock = { execute: jest.fn() };
  const GetMovieByIdUseCaseMock = { execute: jest.fn() };
  const GetMoviesByGenreUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPage, MoviesTableComponent],
    })
      .overrideComponent(MoviesPage, {
        set: {
          providers: [
            { provide: GetAllMoviesUseCase, useValue: GetAllMoviesUseCaseMock },
            { provide: GetMovieByIdUseCase, useValue: GetMovieByIdUseCaseMock },
            {
              provide: GetMoviesByGenreUseCase,
              useValue: GetMoviesByGenreUseCaseMock,
            },
          ],
        },
      })
      .compileComponents();

    GetAllMoviesUseCaseMock.execute.mockReturnValue(of(MOVIES_MOCK));

    fixture = TestBed.createComponent(MoviesPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.movies).toEqual([]);
  });

  it('debe listar las películas al inicializar (getAll)', () => {
    fixture.detectChanges();
    expect(GetAllMoviesUseCaseMock.execute).toHaveBeenCalledWith(100);
    expect(component.movies).toEqual(MOVIES_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe buscar una película por id (getById)', () => {
    fixture.detectChanges();
    GetMovieByIdUseCaseMock.execute.mockReturnValue(of(MOVIES_MOCK[0]));
    component.movieId = 1;
    component.loadById();
    expect(GetMovieByIdUseCaseMock.execute).toHaveBeenCalledWith(1);
    expect(component.movies).toEqual([MOVIES_MOCK[0]]);
    expect(component.state).toBe('success');
  });

  it('debe filtrar películas por género (getByGenre)', () => {
    fixture.detectChanges();
    GetMoviesByGenreUseCaseMock.execute.mockReturnValue(of(MOVIES_MOCK));
    component.genre = 'Drama';
    component.loadByGenre();
    expect(GetMoviesByGenreUseCaseMock.execute).toHaveBeenCalledWith('Drama');
    expect(component.movies).toEqual(MOVIES_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe cambiar el estado a error si falla el listado', () => {
    GetAllMoviesUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    fixture.detectChanges();
    expect(component.movies).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debe cambiar el estado a error si falla la búsqueda por id', () => {
    fixture.detectChanges();
    GetMovieByIdUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    component.loadById();
    expect(component.state).toBe('error');
  });

  it('debe cambiar el estado a error si falla el filtrado', () => {
    fixture.detectChanges();
    GetMoviesByGenreUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error')),
    );
    component.loadByGenre();
    expect(component.state).toBe('error');
  });
});
