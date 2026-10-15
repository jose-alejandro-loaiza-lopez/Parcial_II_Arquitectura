import { Routes } from '@angular/router';

/**
 * Definición de las rutas del microfrontend de Películas.
 *
 * @remarks
 * Carga de forma perezosa ({@link https://angular.dev/guide/routing}) la
 * página de películas. La página expuesta vía Module Federation
 * (`./MoviesPage`) es exactamente este mismo componente.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/movies/movies.page').then(
        (m) => m.MoviesPage,
      ),
  },
  { path: '**', redirectTo: '' },
];
