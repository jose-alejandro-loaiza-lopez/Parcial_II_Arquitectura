import { Response } from 'express';
import { CustomError } from '../../../domain/errors/custom.error';

/**
 * Manejador centralizado de errores HTTP.
 *
 * @layer Infrastructure
 */
export class HandleError {
  /** Envía una respuesta HTTP estandarizada según el error recibido. */
  static error(error: unknown, res: Response) {
    console.log(`${error}`);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal Server error' });
  }
}
