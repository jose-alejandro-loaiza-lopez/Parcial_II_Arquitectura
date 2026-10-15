import { Routes } from '@angular/router';

/**
 * Definición de las rutas del microfrontend de Usuarios.
 *
 * @remarks
 * Carga de forma perezosa ({@link https://angular.dev/guide/routing}) la
 * página de usuarios. La página expuesta vía Module Federation
 * (`./UsersPage`) es exactamente este mismo componente.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/users/users.page').then((m) => m.UsersPage),
  },
  { path: '**', redirectTo: '' },
];
