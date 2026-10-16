import { envs } from './infrastructure/web/config/envs';
import { AppRoutes } from './infrastructure/web/routes/routes';
import { Server } from './infrastructure/web/server';

/**
 * Punto de entrada del microservicio de películas.
 */
function main(): void {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });
  server.start();
}

(async () => {
  main();
})();
