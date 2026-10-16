import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetAllMoviesUseCase } from '../../../core/application/usecases/get-all-movies.usecase';
import { GetMovieByIdUseCase } from '../../../core/application/usecases/get-movie-by-id.usecase';
import { GetMoviesByGenreUseCase } from '../../../core/application/usecases/get-movies-by-genre.usecase';
import { Movie, MovieGenre } from '../../../core/domain/models/movie.model';
import { MovieRepository } from '../../../core/domain/repositories/movie.repository';
import { MovieLocalRepositoryImpl } from '../../../core/infrastructure/repositories/local-implementation/movie-local.repository.impl';
import { MovieNodeRepositoryImpl } from '../../../core/infrastructure/repositories/node-implementation/movie-node.repository.impl';
import { AlertComponent } from '../../components/alert/alert.component';
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Página contenedora del microfrontend de Películas.
 *
 * @description
 * Componente de la **capa de presentación** que consume los tres casos
 * de uso del microfrontend y renderiza la información a través de
 * {@link MoviesTableComponent}:
 *
 * 1. {@link GetAllMoviesUseCase} — listar todas las películas.
 * 2. {@link GetMovieByIdUseCase} — buscar una película por id.
 * 3. {@link GetMoviesByGenreUseCase} — filtrar por género.
 *
 * Los *providers* del repositorio se registran aquí (a nivel de
 * componente) para que la inyección de dependencias funcione tanto en
 * ejecución standalone como cuando el host carga esta página vía Module
 * Federation. Para alternar entre datos locales y el microservicio Node
 * basta con comentar/descomentar el provider correspondiente.
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  imports: [MoviesTableComponent, AlertComponent, FormsModule],
  providers: [
    GetAllMoviesUseCase,
    GetMovieByIdUseCase,
    GetMoviesByGenreUseCase,

    // Implementación MICROSERVICIO (consume Microservice-Movies-NodeJS en :3003)
    { provide: MovieRepository, useClass: MovieNodeRepositoryImpl },

    // Implementación LOCAL (datos simulados con faker, sin microservicio)
    // { provide: MovieRepository, useClass: MovieLocalRepositoryImpl },
  ],
})
export class MoviesPage implements OnInit {
  /** Listado de películas mostrado en la tabla. */
  movies: Movie[] = [];

  /** Estado actual del componente. */
  state: State = 'init';

  /** Identificador consultado en la búsqueda por id. */
  movieId = 1;

  /** Género seleccionado para el filtrado. */
  genre: MovieGenre = 'Drama';

  /** Géneros disponibles para el filtro. */
  readonly genres: MovieGenre[] = [
    'Accion',
    'Comedia',
    'Drama',
    'Terror',
    'Ciencia Ficcion',
  ];

  private getAllMovies = inject(GetAllMoviesUseCase);
  private getMovieById = inject(GetMovieByIdUseCase);
  private getMoviesByGenre = inject(GetMoviesByGenreUseCase);

  /** Carga inicial: lista las películas. */
  ngOnInit(): void {
    this.loadAll();
  }

  /** Caso de uso 1: listar todas las películas. */
  loadAll(): void {
    this.state = 'loading';
    this.getAllMovies.execute(10).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }

  /** Caso de uso 2: buscar una película por id. */
  loadById(): void {
    this.state = 'loading';
    this.getMovieById.execute(Number(this.movieId)).subscribe({
      next: (movie) => {
        this.movies = [movie];
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }

  /** Caso de uso 3: filtrar películas por género. */
  loadByGenre(): void {
    this.state = 'loading';
    this.getMoviesByGenre.execute(this.genre).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
