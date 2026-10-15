import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Movie, MovieGenre } from '../../domain/models/movie.model';

/**
 * Servicio de infraestructura (Data Source) del microfrontend de Películas.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y provee los datos desde dos
 * orígenes posibles:
 *
 * - Datos locales simulados con `faker` (implementación **Local**).
 * - Microservicio de películas vía HTTP (implementación **Node**).
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso; lo usan los
 * repositorios de infraestructura, que adaptan los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  /** Cliente HTTP de Angular. */
  private httpClient = inject(HttpClient);

  /** URL base del microservicio de películas (Microservice-Movies-NodeJS). */
  private readonly nodeUrl = `${environment.baseUrl}/api`;

  /** Géneros disponibles para la generación de datos locales. */
  private readonly genres: MovieGenre[] = [
    'Accion',
    'Comedia',
    'Drama',
    'Terror',
    'Ciencia Ficcion',
  ];

  /**
   * Constructor de una película simulada a partir de un identificador.
   *
   * @param id Identificador de la película.
   * @returns Una película generada con datos aleatorios.
   * @internal
   */
  private buildMovie(id: number): Movie {
    return {
      id,
      title: faker.lorem.words(3),
      genre: faker.helpers.arrayElement(this.genres),
      releaseYear: faker.number.int({ min: 1970, max: 2024 }),
      rating: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
    };
  }

  // ---------------------------------------------------------------------
  // Implementación LOCAL (datos simulados con faker)
  // ---------------------------------------------------------------------

  /**
   * Obtiene un listado de películas desde datos locales simulados.
   *
   * @param countMovies Cantidad de películas a generar.
   * @returns Observable que emite un arreglo de {@link Movie}.
   */
  getAllMoviesLocal(countMovies: number): Observable<Movie[]> {
    const movies: Movie[] = [];
    for (let i = 1; i <= countMovies; i++) {
      movies.push(this.buildMovie(i));
    }
    return of(movies);
  }

  /**
   * Obtiene una película por su id desde datos locales simulados.
   *
   * @param id Identificador único de la película.
   * @returns Observable que emite una {@link Movie}.
   */
  getMovieByIdLocal(id: number): Observable<Movie> {
    return of(this.buildMovie(id));
  }

  /**
   * Obtiene las películas de un género desde datos locales simulados.
   *
   * @param genre Género por el cual filtrar.
   * @returns Observable que emite un arreglo de {@link Movie}.
   */
  getMoviesByGenreLocal(genre: MovieGenre): Observable<Movie[]> {
    const movies: Movie[] = [];
    for (let i = 1; i <= 5; i++) {
      movies.push({ ...this.buildMovie(i), genre });
    }
    return of(movies);
  }

  // ---------------------------------------------------------------------
  // Implementación NODE (consumo del microservicio vía HTTP)
  // ---------------------------------------------------------------------

  /**
   * Obtiene el listado de películas desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/movies/{countMovies}`.
   * @param countMovies Cantidad de películas a solicitar.
   * @returns Observable que emite un arreglo de {@link Movie}.
   */
  getAllMoviesNode(countMovies: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.nodeUrl}/movies/${countMovies}`);
  }

  /**
   * Obtiene una película por su id desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/movies/id/{id}`.
   * @param id Identificador único de la película.
   * @returns Observable que emite una {@link Movie}.
   */
  getMovieByIdNode(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.nodeUrl}/movies/id/${id}`);
  }

  /**
   * Obtiene las películas de un género desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/movies/genre/{genre}`.
   * @param genre Género por el cual filtrar.
   * @returns Observable que emite un arreglo de {@link Movie}.
   */
  getMoviesByGenreNode(genre: MovieGenre): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${this.nodeUrl}/movies/genre/${genre}`,
    );
  }
}
