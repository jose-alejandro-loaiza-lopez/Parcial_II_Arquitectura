import { Observable } from 'rxjs';
import { User, UserEngineering } from '../models/user.model';

/**
 * Contrato del repositorio de usuarios.
 *
 * @description
 * Define el contrato de acceso a datos para la entidad `User` dentro de
 * la **capa de dominio**, siguiendo los principios de Clean Architecture.
 * Desacopla la lógica de negocio de los detalles de implementación de la
 * infraestructura (API REST, almacenamiento local, mocks, etc.).
 *
 * @remarks
 * La implementación concreta se provee mediante inyección de dependencias
 * desde la capa de infraestructura. Los casos de uso dependen únicamente
 * de esta abstracción.
 *
 * @architecture Clean Architecture
 * @layer Domain
 *
 * @see User
 */
export abstract class UserRepository {
  /**
   * Obtiene el listado completo de usuarios.
   *
   * @param countUsers Cantidad de usuarios a recuperar.
   * @returns Observable que emite un arreglo de usuarios del dominio.
   */
  abstract getAll(countUsers: number): Observable<User[]>;

  /**
   * Obtiene un usuario por su identificador.
   *
   * @param id Identificador único del usuario.
   * @returns Observable que emite el usuario encontrado.
   */
  abstract getById(id: number): Observable<User>;

  /**
   * Obtiene los usuarios que pertenecen a una ingeniería específica.
   *
   * @param engineering Ingeniería por la cual filtrar.
   * @returns Observable que emite un arreglo de usuarios filtrados.
   */
  abstract getByEngineering(engineering: UserEngineering): Observable<User[]>;
}
