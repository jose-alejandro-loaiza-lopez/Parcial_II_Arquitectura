import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserEngineering } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso: obtener los usuarios por ingeniería.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar los usuarios que pertenecen a una ingeniería concreta.
 * Depende únicamente del contrato {@link UserRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see User
 * @see UserRepository
 */
@Injectable()
export class GetUsersByEngineeringUseCase {
  /** Repositorio de usuarios inyectado por contrato. */
  private userRepository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param engineering Ingeniería por la cual filtrar.
   * @returns Observable que emite el listado de usuarios filtrados.
   */
  execute(engineering: UserEngineering): Observable<User[]> {
    return this.userRepository.getByEngineering(engineering);
  }
}
