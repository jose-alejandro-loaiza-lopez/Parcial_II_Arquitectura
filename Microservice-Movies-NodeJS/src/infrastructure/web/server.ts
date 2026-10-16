import cors from 'cors';
import express, { Router } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { Options } from './interfaces/server.interface';

/**
 * Servidor HTTP (Express) del microservicio.
 *
 * @remarks
 * Monta los middlewares, las rutas de la API, la interfaz de
 * Swagger (`/api/docs`) y el sitio público.
 *
 * @layer Infrastructure (Frameworks & Drivers)
 */
export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start(): Promise<void> {
    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json());

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* Swagger Docs
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //* SPA
    this.app.use((req, res) => {
      res.sendFile(path.join(process.cwd(), this.publicPath, 'index.html'));
    });

    this.app.listen(this.port, () => {
      console.log(`Server Movies Running on Port ${this.port}`);
    });
  }
}
