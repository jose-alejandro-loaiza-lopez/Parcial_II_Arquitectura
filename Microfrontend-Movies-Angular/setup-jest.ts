import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

/**
 * Mock global de `@faker-js/faker`.
 *
 * @remarks
 * La librería faker se distribuye únicamente como ESM, por lo que
 * Jest (que transforma a CommonJS) no puede parsearla directamente.
 * Este mock global permite que cualquier suite que importe archivos
 * que dependan de faker (por ejemplo `DataService`) pueda ejecutarse.
 *
 * Los specs que necesiten valores específicos pueden declarar su
 * propio `jest.mock('@faker-js/faker', ...)` a nivel de archivo, el
 * cual tiene prioridad sobre este mock global.
 */
jest.mock('@faker-js/faker', () => ({
  faker: {
    person: {
      firstName: () => 'Juan',
      lastName: () => 'Pérez',
      fullName: () => 'Juan Pérez',
    },
    internet: {
      email: () => 'test@mail.com',
    },
    number: {
      int: () => 30,
      float: () => 7.5,
    },
    helpers: {
      arrayElement: (arr: unknown[]) => arr[0],
    },
    commerce: {
      productName: () => 'Producto Test',
      price: () => '10.00',
    },
    lorem: {
      sentence: () => 'Comentario de prueba',
      words: () => 'Tema de prueba',
    },
  },
}));
