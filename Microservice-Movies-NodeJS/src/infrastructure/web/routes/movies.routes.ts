import { Router } from 'express';
import { Container } from '../../../dependency-injection/container';

/**
 * Rutas HTTP del recurso `/api/movies`.
 *
 * @layer Infrastructure
 */
export class MoviesRoutes {
  static get routes(): Router {
    const router = Router();

    /**
     * @openapi
     * /api/movies/{countMovies}:
     *   get:
     *     summary: Obtener listado de películas
     *     description: Retorna una lista de películas generadas dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Movies
     *     parameters:
     *       - in: path
     *         name: countMovies
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           example: 10
     *         description: Cantidad de películas a generar (1 a 100)
     *     responses:
     *       200:
     *         description: Lista de películas generadas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Parámetro inválido
     */
    router.get('/:countMovies', Container.moviesController.getAllMovies);

    /**
     * @openapi
     * /api/movies/id/{id}:
     *   get:
     *     summary: Obtener una película por id
     *     description: Retorna una película generada dinámicamente con el identificador solicitado.
     *     tags:
     *       - Movies
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *         description: Identificador único de la película
     *     responses:
     *       200:
     *         description: Película encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Parámetro inválido
     */
    router.get('/id/:id', Container.moviesController.getMovieById);

    /**
     * @openapi
     * /api/movies/genre/{genre}:
     *   get:
     *     summary: Obtener películas por género
     *     description: Retorna una lista de películas generadas dinámicamente para el género solicitado.
     *     tags:
     *       - Movies
     *     parameters:
     *       - in: path
     *         name: genre
     *         required: true
     *         schema:
     *           type: string
     *           enum: [Accion, Comedia, Drama, Terror, Ciencia Ficcion]
     *           example: Drama
     *         description: Género por el cual filtrar
     *     responses:
     *       200:
     *         description: Lista de películas del género
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Parámetro inválido
     */
    router.get('/genre/:genre', Container.moviesController.getMoviesByGenre);

    return router;
  }
}
