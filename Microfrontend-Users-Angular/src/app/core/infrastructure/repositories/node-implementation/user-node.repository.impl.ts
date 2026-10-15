import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserEngineering } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { DataService } from '../../services/data.service';

/**
 * Implementación **Node** del repositorio de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y actúa como *Adapter*
 * entre el dominio y el microservicio de usuarios
 * (Microservice-Users-NodeJS, `http://localhost:3001`). Consume los
 * endpoints del microservicio a través del {@link DataService}.
 *
 * @see UserRepository
 * @see DataService
 */
@Injectable()
export class UserNodeRepositoryImpl extends UserRepository {
  /** Data source de infraestructura. */
  private dataService = inject(DataService);

  /** {@inheritDoc UserRepository.getAll} */
  getAll(countUsers: number): Observable<User[]> {
    return this.dataService.getAllUsersNode(countUsers);
  }

  /** {@inheritDoc UserRepository.getById} */
  getById(id: number): Observable<User> {
    return this.dataService.getUserByIdNode(id);
  }

  /** {@inheritDoc UserRepository.getByEngineering} */
  getByEngineering(engineering: UserEngineering): Observable<User[]> {
    return this.dataService.getUsersByEngineeringNode(engineering);
  }
}
