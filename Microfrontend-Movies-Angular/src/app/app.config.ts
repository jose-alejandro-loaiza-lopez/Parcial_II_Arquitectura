import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración principal del microfrontend de Películas.
 *
 * @remarks
 * Define los *providers* globales necesarios para ejecutar el
 * microfrontend de forma independiente (`ng serve`):
 *
 * - Manejo global de errores del navegador
 * - Detección de cambios basada en Zone.js
 * - Enrutamiento
 * - Cliente HTTP
 *
 * Los *providers* de los repositorios (Local / Node) se registran a
 * nivel de componente (`MoviesPage`) para que funcionen tanto de forma
 * standalone como cuando el host los carga vía Module Federation.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
