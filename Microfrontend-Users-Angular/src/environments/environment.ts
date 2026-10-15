/**
 * Configuración de variables de entorno del microfrontend de Usuarios.
 *
 * @remarks
 * `baseUrl` apunta al microservicio asignado a este microfrontend
 * (Microservice-Users-NodeJS, puerto `3001`). Se utiliza únicamente
 * cuando el proveedor activo es la implementación **Node** del
 * repositorio; con la implementación **Local** (faker) no se realizan
 * peticiones HTTP.
 */
export const environment = {
  /** URL base del microservicio de usuarios. */
  baseUrl: 'http://localhost:3001',
};
