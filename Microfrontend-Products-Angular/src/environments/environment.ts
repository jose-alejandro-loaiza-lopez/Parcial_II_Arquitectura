/**
 * Configuración de variables de entorno del microfrontend de Productos.
 *
 * @remarks
 * `baseUrl` apunta al microservicio asignado a este microfrontend
 * (Microservice-Products-NodeJS, puerto `3002`). Se utiliza únicamente
 * cuando el proveedor activo es la implementación **Node** del
 * repositorio; con la implementación **Local** (faker) no se realizan
 * peticiones HTTP.
 */
export const environment = {
  /** URL base del microservicio de productos. */
  baseUrl: 'http://localhost:3002',
};
