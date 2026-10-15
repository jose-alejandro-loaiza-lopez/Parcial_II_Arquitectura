import { User } from '../core/domain/models/user.model';

/**
 * Datos simulados de usuarios utilizados en las pruebas unitarias.
 *
 * @remarks
 * Este arreglo permite verificar el comportamiento de los casos de uso,
 * repositorios y componentes sin necesidad de realizar peticiones HTTP
 * reales ni de depender de la generación aleatoria de faker.
 */
export const USERS_MOCK: User[] = [
  {
    id: 1,
    name: 'Carlos',
    lastName: 'Ramírez',
    age: 22,
    email: 'carlos.ramirez@example.com',
    engineering: 'Sistemas',
  },
  {
    id: 2,
    name: 'Ana',
    lastName: 'Gómez',
    age: 24,
    email: 'ana.gomez@example.com',
    engineering: 'Industrial',
  },
];
