/**
 * Esquemas de componentes reutilizados por la documentación OpenAPI.
 *
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Usuario del sistema
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del usuario
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           example: Carlos
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *           example: Ramírez
 *         age:
 *           type: integer
 *           description: Edad del usuario
 *           minimum: 18
 *           maximum: 65
 *           example: 22
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: carlos.ramirez@uceva.edu.co
 *         engineering:
 *           type: string
 *           description: Carrera o ingeniería del usuario
 *           enum: [Sistemas, Electronica, Biomedica, Industrial, Ambiental]
 *           example: Sistemas
 *     Error:
 *       type: object
 *       description: Respuesta de error estandarizada
 *       properties:
 *         error:
 *           type: string
 *           description: Mensaje descriptivo del error
 *           example: No existe un usuario con el id 999
 */
export {};
