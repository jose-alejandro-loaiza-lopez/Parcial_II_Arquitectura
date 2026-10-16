import 'dotenv/config';
import { get } from 'env-var';

/**
 * Variables de entorno validadas del microservicio.
 *
 * @layer Infrastructure
 */
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
};
