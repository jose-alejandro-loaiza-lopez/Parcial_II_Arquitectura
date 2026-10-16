/**
 * Entidad de dominio que representa un usuario.
 *
 * @layer Domain
 */
export interface User {
  /** Identificador único del usuario */
  id: number;

  /** Nombre del usuario */
  name: string;

  /** Apellido del usuario */
  lastName: string;

  /** Edad del usuario */
  age: number;

  /** Correo electrónico del usuario */
  email: string;

  /** Carrera o ingeniería del usuario */
  engineering: UserEngineering;
}

/**
 * Ingenierías válidas de un usuario.
 *
 * @layer Domain
 */
export type UserEngineering =
  | 'Sistemas'
  | 'Electronica'
  | 'Biomedica'
  | 'Industrial'
  | 'Ambiental';

/**
 * Lista de ingenierías válidas, usada para la generación de datos
 * y para la validación del filtrado.
 */
export const USER_ENGINEERINGS: readonly UserEngineering[] = [
  'Sistemas',
  'Electronica',
  'Biomedica',
  'Industrial',
  'Ambiental',
];
