import { CustomError } from '../../domain/errors/custom.error';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso: obtener un usuario por su identificador.
 *
 * @layer Application
 */
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    if (!Number.isInteger(id) || id < 1) {
      throw CustomError.badRequest('id must be a positive integer');
    }
    return this.userRepository.getById(id);
  }
}
