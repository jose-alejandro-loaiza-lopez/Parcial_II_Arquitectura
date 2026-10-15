import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserEngineering } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación **Local** del repositorio de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y actúa como *Adapter*
 * entre el dominio y el {@link DataService}. Usa datos simulados con
 * faker, por lo que no requiere que el microservicio esté en ejecución.
 *
 * @see UserRepository
 * @see DataService
 */
@Injectable()
export class UserLocalRepositoryImpl extends UserRepository {
  /** Data source de infraestructura. */
  private dataService = inject(DataService);

  /** {@inheritDoc UserRepository.getAll} */
  getAll(countUsers: number): Observable<User[]> {
    return this.dataService.getAllUsersLocal(countUsers);
  }

  /** {@inheritDoc UserRepository.getById} */
  getById(id: number): Observable<User> {
    return this.dataService.getUserByIdLocal(id);
  }

  /** {@inheritDoc UserRepository.getByEngineering} */
  getByEngineering(engineering: UserEngineering): Observable<User[]> {
    return this.dataService.getUsersByEngineeringLocal(engineering);
  }
}
