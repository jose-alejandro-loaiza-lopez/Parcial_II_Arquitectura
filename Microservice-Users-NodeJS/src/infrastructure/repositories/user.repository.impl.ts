import { User, UserEngineering } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserDatasource } from '../datasources/user.datasource';

/**
 * Implementación del contrato `UserRepository` sobre la fuente de
 * datos simulada.
 *
 * @layer Infrastructure
 */
export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly datasource: UserDatasource) {
    super();
  }

  getAll(countUsers: number): Promise<User[]> {
    return this.datasource.getAll(countUsers);
  }

  getById(id: number): Promise<User> {
    return this.datasource.getById(id);
  }

  getByEngineering(engineering: UserEngineering): Promise<User[]> {
    return this.datasource.getByEngineering(engineering);
  }
}
