import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieGenre } from '../../../domain/models/movie.model';
import { MovieRepository } from '../../../domain/repositories/movie.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación **Node** del repositorio de películas.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y actúa como *Adapter*
 * entre el dominio y el microservicio de películas
 * (Microservice-Movies-NodeJS, `http://localhost:3003`). Consume los
 * endpoints del microservicio a través del {@link DataService}.
 *
 * @see MovieRepository
 * @see DataService
 */
@Injectable()
export class MovieNodeRepositoryImpl extends MovieRepository {
  /** Data source de infraestructura. */
  private dataService = inject(DataService);

  /** {@inheritDoc MovieRepository.getAll} */
  getAll(countMovies: number): Observable<Movie[]> {
    return this.dataService.getAllMoviesNode(countMovies);
  }

  /** {@inheritDoc MovieRepository.getById} */
  getById(id: number): Observable<Movie> {
    return this.dataService.getMovieByIdNode(id);
  }

  /** {@inheritDoc MovieRepository.getByGenre} */
  getByGenre(genre: MovieGenre): Observable<Movie[]> {
    return this.dataService.getMoviesByGenreNode(genre);
  }
}
