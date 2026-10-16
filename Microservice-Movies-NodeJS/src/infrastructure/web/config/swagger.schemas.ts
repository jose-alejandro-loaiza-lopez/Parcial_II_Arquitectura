/**
 * Esquemas de componentes reutilizados por la documentación OpenAPI.
 *
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       description: Película del sistema
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único de la película
 *           example: 1
 *         title:
 *           type: string
 *           description: Título de la película
 *           example: Invasión Final
 *         genre:
 *           type: string
 *           description: Género cinematográfico de la película
 *           enum: [Accion, Comedia, Drama, Terror, Ciencia Ficcion]
 *           example: Accion
 *         releaseYear:
 *           type: integer
 *           description: Año de estreno de la película
 *           minimum: 1970
 *           maximum: 2024
 *           example: 2015
 *         rating:
 *           type: number
 *           format: float
 *           description: Calificación de la película (escala de 1 a 10)
 *           minimum: 1
 *           maximum: 10
 *           example: 7.8
 *     Error:
 *       type: object
 *       description: Respuesta de error estandarizada
 *       properties:
 *         error:
 *           type: string
 *           description: Mensaje descriptivo del error
 *           example: No existe una película con el id 999
 */
export {};
