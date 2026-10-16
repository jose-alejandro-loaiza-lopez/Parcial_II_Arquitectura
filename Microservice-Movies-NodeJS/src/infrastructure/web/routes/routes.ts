import { Router } from 'express';
import { MoviesRoutes } from './movies.routes';

/**
 * Agregador de rutas de la aplicación.
 *
 * @layer Infrastructure
 */
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/movies', MoviesRoutes.routes);

    return router;
  }
}
