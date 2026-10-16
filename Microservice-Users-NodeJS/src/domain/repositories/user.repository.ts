import { User, UserEngineering } from '../models/user.model';

/**
 * Contrato abstracto del repositorio de usuarios.
 *
 * @layer Domain
 */
export abstract class UserRepository {
  /** Lista `countUsers` usuarios generados. */
  abstract getAll(countUsers: number): Promise<User[]>;

  /** Obtiene un usuario por su identificador. */
  abstract getById(id: number): Promise<User>;

  /** Lista los usuarios de una ingeniería. */
  abstract getByEngineering(
    engineering: UserEngineering,
  ): Promise<User[]>;
}
