import { CustomError } from '../../domain/errors/custom.error';
import { User } from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso: listar todos los usuarios.
 *
 * Aplica la regla de negocio que valida la cantidad solicitada
 * (entero entre 1 y 100) antes de delegar en el repositorio.
 *
 * @layer Application
 */
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(countUsers: number): Promise<User[]> {
    if (!Number.isInteger(countUsers) || countUsers < 1 || countUsers > 100) {
      throw CustomError.badRequest(
        'countUsers must be an integer between 1 and 100',
      );
    }
    return this.userRepository.getAll(countUsers);
  }
}
