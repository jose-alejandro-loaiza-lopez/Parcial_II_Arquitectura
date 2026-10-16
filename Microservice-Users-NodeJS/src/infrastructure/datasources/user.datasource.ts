import { User, UserEngineering } from '../../domain/models/user.model';
import { CustomError } from '../../domain/errors/custom.error';

/**
 * Fuente de datos en memoria del microservicio de usuarios.
 *
 * @remarks
 * Expone un conjunto fijo de usuarios semilla para que todas las
 * consultas sean deterministas: listar, buscar por id y filtrar
 * siempre operan sobre los mismos datos.
 *
 * @layer Infrastructure
 */
export class UserDatasource {
  /** Datos semilla del microservicio (20 usuarios, 4 por ingeniería). */
  private static readonly USERS: readonly User[] = [
    {
      id: 1,
      name: 'Carlos',
      lastName: 'Ramírez',
      age: 22,
      email: 'carlos.ramirez@uceva.edu.co',
      engineering: 'Sistemas',
    },
    {
      id: 2,
      name: 'Laura',
      lastName: 'Gómez',
      age: 24,
      email: 'laura.gomez@uceva.edu.co',
      engineering: 'Sistemas',
    },
    {
      id: 3,
      name: 'Andrés',
      lastName: 'Torres',
      age: 21,
      email: 'andres.torres@uceva.edu.co',
      engineering: 'Sistemas',
    },
    {
      id: 4,
      name: 'Valentina',
      lastName: 'Ríos',
      age: 23,
      email: 'valentina.rios@uceva.edu.co',
      engineering: 'Sistemas',
    },
    {
      id: 5,
      name: 'Santiago',
      lastName: 'Herrera',
      age: 25,
      email: 'santiago.herrera@uceva.edu.co',
      engineering: 'Electronica',
    },
    {
      id: 6,
      name: 'Camila',
      lastName: 'Castro',
      age: 20,
      email: 'camila.castro@uceva.edu.co',
      engineering: 'Electronica',
    },
    {
      id: 7,
      name: 'Juan Esteban',
      lastName: 'Muñoz',
      age: 26,
      email: 'juan.munoz@uceva.edu.co',
      engineering: 'Electronica',
    },
    {
      id: 8,
      name: 'Isabella',
      lastName: 'Vargas',
      age: 22,
      email: 'isabella.vargas@uceva.edu.co',
      engineering: 'Electronica',
    },
    {
      id: 9,
      name: 'Sebastián',
      lastName: 'López',
      age: 23,
      email: 'sebastian.lopez@uceva.edu.co',
      engineering: 'Biomedica',
    },
    {
      id: 10,
      name: 'Mariana',
      lastName: 'Ortiz',
      age: 21,
      email: 'mariana.ortiz@uceva.edu.co',
      engineering: 'Biomedica',
    },
    {
      id: 11,
      name: 'Daniel',
      lastName: 'Quintero',
      age: 27,
      email: 'daniel.quintero@uceva.edu.co',
      engineering: 'Biomedica',
    },
    {
      id: 12,
      name: 'Sofía',
      lastName: 'Mendoza',
      age: 24,
      email: 'sofia.mendoza@uceva.edu.co',
      engineering: 'Biomedica',
    },
    {
      id: 13,
      name: 'Alejandro',
      lastName: 'Peña',
      age: 28,
      email: 'alejandro.pena@uceva.edu.co',
      engineering: 'Industrial',
    },
    {
      id: 14,
      name: 'Natalia',
      lastName: 'Rojas',
      age: 22,
      email: 'natalia.rojas@uceva.edu.co',
      engineering: 'Industrial',
    },
    {
      id: 15,
      name: 'Felipe',
      lastName: 'Cardona',
      age: 25,
      email: 'felipe.cardona@uceva.edu.co',
      engineering: 'Industrial',
    },
    {
      id: 16,
      name: 'Juliana',
      lastName: 'Salazar',
      age: 23,
      email: 'juliana.salazar@uceva.edu.co',
      engineering: 'Industrial',
    },
    {
      id: 17,
      name: 'Ricardo',
      lastName: 'Mejía',
      age: 26,
      email: 'ricardo.mejia@uceva.edu.co',
      engineering: 'Ambiental',
    },
    {
      id: 18,
      name: 'Paula',
      lastName: 'Cárdenas',
      age: 20,
      email: 'paula.cardenas@uceva.edu.co',
      engineering: 'Ambiental',
    },
    {
      id: 19,
      name: 'Óscar',
      lastName: 'Gutiérrez',
      age: 24,
      email: 'oscar.gutierrez@uceva.edu.co',
      engineering: 'Ambiental',
    },
    {
      id: 20,
      name: 'Manuela',
      lastName: 'Restrepo',
      age: 21,
      email: 'manuela.restrepo@uceva.edu.co',
      engineering: 'Ambiental',
    },
  ];

  /** Lista hasta `countUsers` usuarios del conjunto de datos. */
  async getAll(countUsers: number): Promise<User[]> {
    return UserDatasource.USERS.slice(0, countUsers).map((user) => ({
      ...user,
    }));
  }

  /** Retorna el usuario con el id solicitado o un error 404. */
  async getById(id: number): Promise<User> {
    const user = UserDatasource.USERS.find((candidate) => candidate.id === id);

    if (!user) {
      throw CustomError.notFound(`No existe un usuario con el id ${id}`);
    }

    return { ...user };
  }

  /** Lista los usuarios de la ingeniería solicitada. */
  async getByEngineering(engineering: UserEngineering): Promise<User[]> {
    return UserDatasource.USERS.filter(
      (user) => user.engineering === engineering,
    ).map((user) => ({ ...user }));
  }
}
