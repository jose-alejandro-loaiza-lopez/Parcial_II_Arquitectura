import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso: obtener el listado completo de películas.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar todas las películas del sistema. Desacopla la capa de
 * presentación de los detalles de acceso a datos mediante el contrato
 * {@link MovieRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Movie
 * @see MovieRepository
 */
@Injectable()
export class GetAllMoviesUseCase {
  /** Repositorio de películas inyectado por contrato. */
  private movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param countMovies Cantidad de películas a recuperar.
   * @returns Observable que emite el listado de películas.
   */
  execute(countMovies: number): Observable<Movie[]> {
    return this.movieRepository.getAll(countMovies);
  }
}
