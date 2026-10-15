import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import {
  User,
  UserEngineering,
} from '../../../core/domain/models/user.model';

/**
 * Componente de tabla de usuarios.
 *
 * @description
 * Muestra un listado de usuarios en una tabla, incluyendo un *badge*
 * cuyo color depende de la ingeniería del usuario. Recibe los datos del
 * componente padre a través del `Input` `users`.
 *
 * @example
 * ```html
 * <app-users-table [users]="usersList"></app-users-table>
 * ```
 *
 * @architecture Clean Architecture
 * @layer Presentation
 */
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  imports: [BadgeAtom],
})
export class UsersTableComponent {
  /** Listado de usuarios que se mostrarán en la tabla. */
  @Input() users: User[] = [];

  /**
   * Mapeo de ingenierías a tipos de *badge*.
   *
   * @remarks
   * - 'Sistemas' → 'success'
   * - 'Electronica' → 'primary'
   * - 'Biomedica' → 'warning'
   * - 'Industrial' → 'danger'
   * - 'Ambiental' → 'secondary'
   */
  engineeringMap: Record<UserEngineering, BadgeType> = {
    Sistemas: 'success',
    Electronica: 'primary',
    Biomedica: 'warning',
    Industrial: 'danger',
    Ambiental: 'secondary',
  };
}
