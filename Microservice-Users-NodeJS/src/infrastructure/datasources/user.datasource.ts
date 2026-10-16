import { faker } from '@faker-js/faker';
import {
  User,
  USER_ENGINEERINGS,
  UserEngineering,
} from '../../domain/models/user.model';

/**
 * Fuente de datos simulada del microservicio de usuarios.
 *
 * @remarks
 * Genera usuarios aleatorios con `faker`, manteniendo la forma del
 * modelo de dominio `User`.
 *
 * @layer Infrastructure
 */
export class UserDatasource {
  /** Cantidad de usuarios generados en los filtrados. */
  private static readonly FILTERED_COUNT = 5;

  /** Lista `countUsers` usuarios con ids consecutivos. */
  async getAll(countUsers: number): Promise<User[]> {
    const users: User[] = [];
    for (let id = 1; id <= countUsers; id++) {
      users.push(this.generateUser(id));
    }
    return users;
  }

  /** Genera un único usuario con el id solicitado. */
  async getById(id: number): Promise<User> {
    return this.generateUser(id);
  }

  /** Lista usuarios de la ingeniería solicitada. */
  async getByEngineering(engineering: UserEngineering): Promise<User[]> {
    const users: User[] = [];
    for (let id = 1; id <= UserDatasource.FILTERED_COUNT; id++) {
      users.push({ ...this.generateUser(id), engineering });
    }
    return users;
  }

  /** Construye un usuario aleatorio a partir de un id. */
  private generateUser(id: number): User {
    return {
      id,
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      engineering: faker.helpers.arrayElement([...USER_ENGINEERINGS]),
    };
  }
}
