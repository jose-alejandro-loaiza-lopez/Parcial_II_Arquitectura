import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso: obtener un usuario por su identificador.
 *
 * @description
 * Pertenece a la **capa de aplicación** y encapsula la acción de negocio
 * de recuperar un único usuario. Depende únicamente del contrato
 * {@link UserRepository}.
 *
 * @architecture Clean Architecture
 * @layer Application
 *
 * @see User
 * @see UserRepository
 */
@Injectable()
export class GetUserByIdUseCase {
  /** Repositorio de usuarios inyectado por contrato. */
  private userRepository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id Identificador único del usuario.
   * @returns Observable que emite el usuario encontrado.
   */
  execute(id: number): Observable<User> {
    return this.userRepository.getById(id);
  }
}
