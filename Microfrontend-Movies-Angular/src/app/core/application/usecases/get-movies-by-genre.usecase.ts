import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieGenre } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso: obtener las películas por género.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar las películas que pertenecen a un género concreto.
 * Depende únicamente del contrato {@link MovieRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Movie
 * @see MovieRepository
 */
@Injectable()
export class GetMoviesByGenreUseCase {
  /** Repositorio de películas inyectado por contrato. */
  private movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param genre Género por el cual filtrar.
   * @returns Observable que emite el listado de películas filtradas.
   */
  execute(genre: MovieGenre): Observable<Movie[]> {
    return this.movieRepository.getByGenre(genre);
  }
}
