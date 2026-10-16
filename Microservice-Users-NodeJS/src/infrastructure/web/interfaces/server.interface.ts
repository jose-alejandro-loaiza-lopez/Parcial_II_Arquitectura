import { Router } from 'express';

/**
 * Opciones de configuración del servidor HTTP.
 *
 * @layer Infrastructure
 */
export interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}
