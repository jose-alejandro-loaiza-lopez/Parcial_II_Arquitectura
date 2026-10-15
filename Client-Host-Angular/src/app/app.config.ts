import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración principal de la aplicación host.
 *
 * @remarks
 * Define los *providers* globales utilizados en el arranque de la
 * aplicación mediante `bootstrapApplication`:
 *
 * - Manejo global de errores del navegador.
 * - Configuración de detección de cambios (Zone.js).
 * - Sistema de enrutamiento (carga los microfrontends remotos).
 * - Cliente HTTP (disponible para los microfrontends remotos).
 *
 * @see {@link bootstrapApplication}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
