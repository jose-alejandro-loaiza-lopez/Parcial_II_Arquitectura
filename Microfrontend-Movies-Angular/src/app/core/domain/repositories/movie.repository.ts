import { Observable } from 'rxjs';
import { Movie, MovieGenre } from '../models/movie.model';

/**
 * Contrato del repositorio de películas.
 *
 * @description
 * Define el contrato de acceso a datos para la entidad `Movie` dentro de
 * la **capa de dominio**, siguiendo los principios de Clean Architecture.
 * Desacopla la lógica de negocio de los detalles de implementación de la
 * infraestructura (API REST, almacenamiento local, mocks, etc.).
 *
 * @remarks
 * La implementación concreta se provee mediante inyección de dependencias
 * desde la capa de infraestructura. Los casos de uso dependen únicamente
 * de esta abstracción.
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see Movie
 */
export abstract class MovieRepository {
  /**
   * Obtiene el listado completo de películas.
   *
   * @param countMovies Cantidad de películas a recuperar.
   * @returns Observable que emite un arreglo de películas del dominio.
   */
  abstract getAll(countMovies: number): Observable<Movie[]>;

  /**
   * Obtiene una película por su identificador.
   *
   * @param id Identificador único de la película.
   * @returns Observable que emite la película encontrada.
   */
  abstract getById(id: number): Observable<Movie>;

  /**
   * Obtiene las películas que pertenecen a un género específico.
   *
   * @param genre Género por el cual filtrar.
   * @returns Observable que emite un arreglo de películas filtradas.
   */
  abstract getByGenre(genre: MovieGenre): Observable<Movie[]>;
}
