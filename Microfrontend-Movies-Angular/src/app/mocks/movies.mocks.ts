import { Movie } from '../core/domain/models/movie.model';

/**
 * Datos simulados de películas utilizados en las pruebas unitarias.
 *
 * @remarks
 * Este arreglo permite verificar el comportamiento de los casos de uso,
 * repositorios y componentes sin necesidad de realizar peticiones HTTP
 * reales ni de depender de la generación aleatoria de faker.
 */
export const MOVIES_MOCK: Movie[] = [
  {
    id: 1,
    title: 'El Padrino',
    genre: 'Drama',
    releaseYear: 1972,
    rating: 9.2,
  },
  {
    id: 2,
    title: 'Volver al Futuro',
    genre: 'Ciencia Ficcion',
    releaseYear: 1985,
    rating: 8.5,
  },
  {
    id: 3,
    title: 'Rápidos y Furiosos',
    genre: 'Accion',
    releaseYear: 2001,
    rating: 6.8,
  },
];
