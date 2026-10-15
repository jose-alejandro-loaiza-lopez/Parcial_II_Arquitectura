import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso: obtener el listado completo de usuarios.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar todos los usuarios del sistema. Desacopla la capa de
 * presentación de los detalles de acceso a datos mediante el contrato
 * {@link UserRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see User
 * @see UserRepository
 */
@Injectable()
export class GetAllUsersUseCase {
  /** Repositorio de usuarios inyectado por contrato. */
  private userRepository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param countUsers Cantidad de usuarios a recuperar.
   * @returns Observable que emite el listado de usuarios.
   */
  execute(countUsers: number): Observable<User[]> {
    return this.userRepository.getAll(countUsers);
  }
}
