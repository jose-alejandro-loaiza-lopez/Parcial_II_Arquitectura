import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User, UserEngineering } from '../../domain/models/user.model';

/**
 * Servicio de infraestructura (Data Source) del microfrontend de Usuarios.
 *
 * @remarks
 * Pertenece a la **capa de infraestructura** y provee los datos desde dos
 * orígenes posibles:
 *
 * - Datos locales simulados con `faker` (implementación **Local**).
 * - Microservicio de usuarios vía HTTP (implementación **Node**).
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser consumido directamente por los casos de uso; lo usan los
 * repositorios de infraestructura, que adaptan los datos al dominio.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  /** Cliente HTTP de Angular. */
  private httpClient = inject(HttpClient);

  /** URL base del microservicio de usuarios (Microservice-Users-NodeJS). */
  private readonly nodeUrl = `${environment.baseUrl}/api`;

  /** Ingenierías disponibles para la generación de datos locales. */
  private readonly engineerings: UserEngineering[] = [
    'Sistemas',
    'Electronica',
    'Biomedica',
    'Industrial',
    'Ambiental',
  ];

  /**
   * Constructor de un usuario simulado a partir de un identificador.
   *
   * @param id Identificador del usuario.
   * @returns Un usuario generado con datos aleatorios.
   * @internal
   */
  private buildUser(id: number): User {
    return {
      id,
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 65 }),
      email: faker.internet.email(),
      engineering: faker.helpers.arrayElement(this.engineerings),
    };
  }

  // ---------------------------------------------------------------------
  // Implementación LOCAL (datos simulados con faker)
  // ---------------------------------------------------------------------

  /**
   * Obtiene un listado de usuarios desde datos locales simulados.
   *
   * @param countUsers Cantidad de usuarios a generar.
   * @returns Observable que emite un arreglo de {@link User}.
   */
  getAllUsersLocal(countUsers: number): Observable<User[]> {
    const users: User[] = [];
    for (let i = 1; i <= countUsers; i++) {
      users.push(this.buildUser(i));
    }
    return of(users);
  }

  /**
   * Obtiene un usuario por su id desde datos locales simulados.
   *
   * @param id Identificador único del usuario.
   * @returns Observable que emite un {@link User}.
   */
  getUserByIdLocal(id: number): Observable<User> {
    return of(this.buildUser(id));
  }

  /**
   * Obtiene los usuarios de una ingeniería desde datos locales simulados.
   *
   * @param engineering Ingeniería por la cual filtrar.
   * @returns Observable que emite un arreglo de {@link User}.
   */
  getUsersByEngineeringLocal(engineering: UserEngineering): Observable<User[]> {
    const users: User[] = [];
    for (let i = 1; i <= 5; i++) {
      users.push({ ...this.buildUser(i), engineering });
    }
    return of(users);
  }

  // ---------------------------------------------------------------------
  // Implementación NODE (consumo del microservicio vía HTTP)
  // ---------------------------------------------------------------------

  /**
   * Obtiene el listado de usuarios desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/users/{countUsers}`.
   * @param countUsers Cantidad de usuarios a solicitar.
   * @returns Observable que emite un arreglo de {@link User}.
   */
  getAllUsersNode(countUsers: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.nodeUrl}/users/${countUsers}`);
  }

  /**
   * Obtiene un usuario por su id desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/users/id/{id}`.
   * @param id Identificador único del usuario.
   * @returns Observable que emite un {@link User}.
   */
  getUserByIdNode(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.nodeUrl}/users/id/${id}`);
  }

  /**
   * Obtiene los usuarios de una ingeniería desde el microservicio Node.
   *
   * @remarks Realiza `GET /api/users/engineering/{engineering}`.
   * @param engineering Ingeniería por la cual filtrar.
   * @returns Observable que emite un arreglo de {@link User}.
   */
  getUsersByEngineeringNode(
    engineering: UserEngineering,
  ): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.nodeUrl}/users/engineering/${engineering}`,
    );
  }
}
