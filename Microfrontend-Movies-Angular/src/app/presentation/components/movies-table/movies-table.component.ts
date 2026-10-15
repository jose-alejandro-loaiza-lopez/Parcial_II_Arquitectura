import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Movie, MovieGenre } from '../../../core/domain/models/movie.model';

/**
 * Componente de tabla de películas.
 *
 * @description
 * Muestra un listado de películas en una tabla, incluyendo un *badge*
 * cuyo color depende del género de la película. Recibe los datos del
 * componente padre a través del `Input` `movies`.
 *
 * @example
 * ```html
 * <app-movies-table [movies]="moviesList"></app-movies-table>
 * ```
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  imports: [BadgeAtom],
})
export class MoviesTableComponent {
  /** Listado de películas que se mostrarán en la tabla. */
  @Input() movies: Movie[] = [];

  /**
   * Mapeo de géneros a tipos de *badge*.
   *
   * @remarks
   * - 'Accion' → 'danger'
   * - 'Comedia' → 'warning'
   * - 'Drama' → 'primary'
   * - 'Terror' → 'secondary'
   * - 'Ciencia Ficcion' → 'success'
   */
  genreMap: Record<MovieGenre, BadgeType> = {
    Accion: 'danger',
    Comedia: 'warning',
    Drama: 'primary',
    Terror: 'secondary',
    'Ciencia Ficcion': 'success',
  };
}
