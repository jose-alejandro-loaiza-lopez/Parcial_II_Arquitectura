import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarConfig, NavbarOrganism } from '@brejcha13320/design-system-bootstrap';

/**
 * Componente raíz de la aplicación host.
 *
 * @remarks
 * Actúa como punto de entrada principal del cliente (host) y define la
 * estructura base junto con la configuración del navbar principal
 * mediante el componente `NavbarOrganism`. Es responsable de:
 *
 * - Inicializar el layout general.
 * - Proveer la configuración del menú de navegación (Usuarios, Productos
 *   y Películas).
 * - Renderizar los microfrontends remotos según el sistema de rutas.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, NavbarOrganism],
})
export class App {
  /**
   * Configuración del navbar principal.
   *
   * @remarks
   * Define el título, icono y enlaces de navegación que se renderizan en
   * el componente `NavbarOrganism`. Cada enlace apunta a un
   * microfrontend remoto cargado vía Module Federation.
   */
  navbarConfig: NavbarConfig = {
    title: 'Parcial II - Microfrontends',
    iconConfig: {
      icon: 'bootstrap',
      size: 2,
    },
    navLinks: [
      { text: 'Usuarios', url: '/users' },
      { text: 'Productos', url: '/products' },
      { text: 'Películas', url: '/movies' },
    ],
  };
}
