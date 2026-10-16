import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Especificación OpenAPI del microservicio de usuarios.
 *
 * @layer Infrastructure
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Microservicio de Usuarios (NodeJS)',
      version: '1.0.0',
      description:
        'Documentación de la API de usuarios del Parcial II - Arquitectura de Software.',
    },
    servers: [{ url: 'http://localhost:3001' }],
  },
  apis: [
    './src/infrastructure/web/routes/**/*.routes.ts',
    './src/infrastructure/web/config/swagger.schemas.ts',
  ],
});
