import { CustomError } from '../../domain/errors/custom.error';
import {
  User,
  USER_ENGINEERINGS,
  UserEngineering,
} from '../../domain/models/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

/**
 * Caso de uso: listar los usuarios de una ingeniería.
 *
 * Valida que la ingeniería recibida pertenezca a las permitidas
 * por el dominio.
 *
 * @layer Application
 */
export class GetUsersByEngineeringUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(engineering: UserEngineering): Promise<User[]> {
    if (!USER_ENGINEERINGS.includes(engineering)) {
      throw CustomError.badRequest(
        `engineering must be one of: ${USER_ENGINEERINGS.join(', ')}`,
      );
    }
    return this.userRepository.getByEngineering(engineering);
  }
}
