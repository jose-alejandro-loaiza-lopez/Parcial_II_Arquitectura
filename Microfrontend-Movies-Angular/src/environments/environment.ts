/**
 * Configuración de variables de entorno del microfrontend de Películas.
 *
 * @remarks
 * `baseUrl` apunta al microservicio asignado a este microfrontend
 * (Microservice-Movies-NodeJS, puerto `3003`). Se utiliza únicamente
 * cuando el proveedor activo es la implementación **Node** del
 * repositorio; con la implementación **Local** (faker) no se realizan
 * peticiones HTTP.
 */
export const environment = {
  /** URL base del microservicio de películas. */
  baseUrl: 'http://localhost:3003',
};
