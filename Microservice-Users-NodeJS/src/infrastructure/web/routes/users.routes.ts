import { Router } from 'express';
import { Container } from '../../../dependency-injection/container';

/**
 * Rutas HTTP del recurso `/api/users`.
 *
 * @layer Infrastructure
 */
export class UsersRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @openapi
     * /api/users/{countUsers}:
     *   get:
     *     summary: Obtener listado de usuarios
     *     description: Retorna una lista de usuarios generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: countUsers
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           example: 10
     *         description: Cantidad de usuarios a generar (1 a 100)
     *     responses:
     *       200:
     *         description: Lista de usuarios generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       400:
     *         description: Parámetro inválido
     */
    router.get('/:countUsers', Container.usersController.getAllUsers);

    /**
     * @openapi
     * /api/users/id/{id}:
     *   get:
     *     summary: Obtener un usuario por id
     *     description: Retorna un usuario generado dinámicamente con el identificador solicitado.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *         description: Identificador único del usuario
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Parámetro inválido
     */
    router.get('/id/:id', Container.usersController.getUserById);

    /**
     * @openapi
     * /api/users/engineering/{engineering}:
     *   get:
     *     summary: Obtener usuarios por ingeniería
     *     description: Retorna una lista de usuarios generados dinámicamente para la ingeniería solicitada.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: engineering
     *         required: true
     *         schema:
     *           type: string
     *           enum: [Sistemas, Electronica, Biomedica, Industrial, Ambiental]
     *           example: Sistemas
     *         description: Ingeniería por la cual filtrar
     *     responses:
     *       200:
     *         description: Lista de usuarios de la ingeniería
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       400:
     *         description: Parámetro inválido
     */
    router.get(
      '/engineering/:engineering',
      Container.usersController.getUsersByEngineering,
    );

    return router;
  }
}
