import { GetAllUsersUseCase } from '../application/usecases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../application/usecases/get-user-by-id.usecase';
import { GetUsersByEngineeringUseCase } from '../application/usecases/get-users-by-engineering.usecase';
import { UserDatasource } from '../infrastructure/datasources/user.datasource';
import { UserRepositoryImpl } from '../infrastructure/repositories/user.repository.impl';
import { UsersController } from '../infrastructure/web/controllers/users.controller';

/**
 * Contenedor de inyección de dependencias (Composition Root).
 *
 * @remarks
 * Ensambla manualmente las capas de infraestructura, dominio y
 * aplicación: `Datasource -> Repository -> UseCase -> Controller`.
 */
export class Container {
  //* Datasources (Infrastructure)
  private static readonly userDatasource = new UserDatasource();

  //* Repositories (Infrastructure -> Domain)
  private static readonly userRepository = new UserRepositoryImpl(
    Container.userDatasource,
  );

  //* Use cases (Application)
  private static readonly getAllUsersUseCase = new GetAllUsersUseCase(
    Container.userRepository,
  );

  private static readonly getUserByIdUseCase = new GetUserByIdUseCase(
    Container.userRepository,
  );

  private static readonly getUsersByEngineeringUseCase =
    new GetUsersByEngineeringUseCase(Container.userRepository);

  //* Controllers (Frameworks & Drivers)
  static readonly usersController = new UsersController(
    Container.getAllUsersUseCase,
    Container.getUserByIdUseCase,
    Container.getUsersByEngineeringUseCase,
  );
}
