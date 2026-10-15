import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieGenre } from '../../../domain/models/movie.model';
import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación **Local** del repositorio de películas.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y actúa como *Adapter*
 * entre el dominio y el {@link DataService}. Usa datos simulados con
 * faker, por lo que no requiere que el microservicio esté en ejecución.
 *
 * @see MovieRepository
 * @see DataService
 */
@Injectable()
export class MovieLocalRepositoryImpl extends MovieRepository {
  /** Data source de infraestructura. */
  private dataService = inject(DataService);

  /** {@inheritDoc MovieRepository.getAll} */
  getAll(countMovies: number): Observable<Movie[]> {
    return this.dataService.getAllMoviesLocal(countMovies);
  }

  /** {@inheritDoc MovieRepository.getById} */
  getById(id: number): Observable<Movie> {
    return this.dataService.getMovieByIdLocal(id);
  }

  /** {@inheritDoc MovieRepository.getByGenre} */
  getByGenre(genre: MovieGenre): Observable<Movie[]> {
    return this.dataService.getMoviesByGenreLocal(genre);
  }
}
