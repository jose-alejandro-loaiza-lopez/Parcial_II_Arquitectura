import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Especificación OpenAPI del microservicio de películas.
 *
 * @layer Infrastructure
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Microservicio de Películas (NodeJS)',
      version: '1.0.0',
      description:
        'Documentación de la API de películas del Parcial II - Arquitectura de Software.',
    },
    servers: [{ url: 'http://localhost:3003' }],
  },
  apis: [
    './src/infrastructure/web/routes/**/*.routes.ts',
    './src/infrastructure/web/config/swagger.schemas.ts',
  ],
});
