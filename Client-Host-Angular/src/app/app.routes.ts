import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

/**
 * Definición de las rutas principales de la aplicación host.
 *
 * @remarks
 * Cada ruta carga de forma perezosa un microfrontend remoto mediante
 * `loadRemoteModule` (Module Federation). Los puertos corresponden a:
 *
 * - `4201` → Microfrontend de Usuarios (`./UsersPage`).
 * - `4202` → Microfrontend de Productos (`./ProductsPage`).
 * - `4203` → Microfrontend de Películas (`./MoviesPage`).
 *
 * @see {@link UsersPage}
 * @see {@link ProductsPage}
 * @see {@link MoviesPage}
 */
export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './UsersPage',
      }).then((m) => m.UsersPage),
  },
  {
    path: 'products',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './ProductsPage',
      }).then((m) => m.ProductsPage),
  },
  {
    path: 'movies',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './MoviesPage',
      }).then((m) => m.MoviesPage),
  },
  { path: '**', redirectTo: 'users' },
];
