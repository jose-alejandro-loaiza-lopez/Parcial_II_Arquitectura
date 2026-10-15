import { Routes } from '@angular/router';

/**
 * Definición de las rutas del microfrontend de Productos.
 *
 * @remarks
 * Carga de forma perezosa ({@link https://angular.dev/guide/routing}) la
 * página de productos. La página expuesta vía Module Federation
 * (`./ProductsPage`) es exactamente este mismo componente.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/products/products.page').then(
        (m) => m.ProductsPage,
      ),
  },
  { path: '**', redirectTo: '' },
];
