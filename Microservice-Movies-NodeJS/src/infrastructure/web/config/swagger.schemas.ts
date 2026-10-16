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
 *           example: El Padrino
 *         genre:
 *           type: string
 *           description: Género cinematográfico de la película
 *           enum: [Accion, Comedia, Drama, Terror, Ciencia Ficcion]
 *           example: Drama
 *         releaseYear:
 *           type: integer
 *           description: Año de estreno de la película
 *           minimum: 1970
 *           maximum: 2024
 *           example: 1972
 *         rating:
 *           type: number
 *           format: float
 *           description: Calificación de la película (escala de 1 a 10)
 *           minimum: 1
 *           maximum: 10
 *           example: 9.2
 */
export {};
