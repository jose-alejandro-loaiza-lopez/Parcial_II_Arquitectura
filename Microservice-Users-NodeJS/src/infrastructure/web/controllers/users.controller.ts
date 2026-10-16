import { Request, Response } from 'express';
import { GetAllUsersUseCase } from '../../../application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../../application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../../../application/usecases/get-users-by-engineering.usecase';
import { UserEngineering } from '../../../domain/models/user.model';
import { HandleError } from '../errors/handle.error';

/**
 * Controlador HTTP del microservicio de usuarios.
 *
 * @layer Infrastructure (Frameworks & Drivers)
 */
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUsersByEngineeringUseCase: GetUsersByEngineeringUseCase,
  ) {}

  getAllUsers = (req: Request, res: Response): void => {
    const { countUsers } = req.params;
    this.getAllUsersUseCase
      .execute(Number(countUsers))
      .then((users) => res.json(users))
      .catch((error) => HandleError.error(error, res));
  };

  getUserById = (req: Request, res: Response): void => {
    const { id } = req.params;
    this.getUserByIdUseCase
      .execute(Number(id))
      .then((user) => res.json(user))
      .catch((error) => HandleError.error(error, res));
  };

  getUsersByEngineering = (req: Request, res: Response): void => {
    const { engineering } = req.params;
    this.getUsersByEngineeringUseCase
      .execute(engineering as UserEngineering)
      .then((users) => res.json(users))
      .catch((error) => HandleError.error(error, res));
  };
}
