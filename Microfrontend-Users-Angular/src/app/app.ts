import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del microfrontend de Usuarios.
 *
 * @remarks
 * Actúa como punto de entrada de la aplicación standalone. Cuando el
 * microfrontend se ejecuta de forma independiente, muestra la página
 * de usuarios a través del `router-outlet`. Cuando es consumido por el
 * host mediante Module Federation, el host renderiza directamente la
 * página expuesta (`UsersPage`).
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App {}
