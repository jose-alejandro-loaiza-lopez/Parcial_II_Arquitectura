import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../domain/models/movie.model';
import { MovieRepository } from '../../domain/repositories/movie.repository';

/**
 * Caso de uso: obtener una película por su identificador.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar una única película. Depende únicamente del contrato
 * {@link MovieRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see Movie
 * @see MovieRepository
 */
@Injectable()
export class GetMovieByIdUseCase {
  /** Repositorio de películas inyectado por contrato. */
  private movieRepository = inject(MovieRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id Identificador único de la película.
   * @returns Observable que emite la película encontrada.
   */
  execute(id: number): Observable<Movie> {
    return this.movieRepository.getById(id);
  }
}
