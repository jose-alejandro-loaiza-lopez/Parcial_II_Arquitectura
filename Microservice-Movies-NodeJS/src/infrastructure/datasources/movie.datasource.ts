import { Movie, MovieGenre } from '../../domain/models/movie.model';
import { CustomError } from '../../domain/errors/custom.error';

/**
 * Fuente de datos en memoria del microservicio de películas.
 *
 * @remarks
 * Expone un conjunto fijo de películas semilla para que todas las
 * consultas sean deterministas: listar, buscar por id y filtrar
 * siempre operan sobre los mismos datos.
 *
 * @layer Infrastructure
 */
export class MovieDatasource {
  /** Datos semilla del microservicio (15 películas, 3 por género). */
  private static readonly MOVIES: readonly Movie[] = [
    {
      id: 1,
      title: 'Invasión Final',
      genre: 'Accion',
      releaseYear: 2015,
      rating: 7.8,
    },
    {
      id: 2,
      title: 'Código Rojo',
      genre: 'Accion',
      releaseYear: 2019,
      rating: 8.2,
    },
    {
      id: 3,
      title: 'Persecución Letal',
      genre: 'Accion',
      releaseYear: 2021,
      rating: 6.9,
    },
    {
      id: 4,
      title: 'Familia en Apuros',
      genre: 'Comedia',
      releaseYear: 2018,
      rating: 7.1,
    },
    {
      id: 5,
      title: 'Vacaciones Caóticas',
      genre: 'Comedia',
      releaseYear: 2022,
      rating: 6.5,
    },
    {
      id: 6,
      title: 'El Vecino Molesto',
      genre: 'Comedia',
      releaseYear: 2016,
      rating: 7.4,
    },
    {
      id: 7,
      title: 'El Último Invierno',
      genre: 'Drama',
      releaseYear: 2014,
      rating: 8.6,
    },
    {
      id: 8,
      title: 'Cartas al Viento',
      genre: 'Drama',
      releaseYear: 2017,
      rating: 8.1,
    },
    {
      id: 9,
      title: 'La Casa del Lago',
      genre: 'Drama',
      releaseYear: 2020,
      rating: 7.9,
    },
    {
      id: 10,
      title: 'La Casa Abandonada',
      genre: 'Terror',
      releaseYear: 2013,
      rating: 6.8,
    },
    {
      id: 11,
      title: 'Susurros en la Noche',
      genre: 'Terror',
      releaseYear: 2019,
      rating: 7.2,
    },
    {
      id: 12,
      title: 'El Bosque Maldito',
      genre: 'Terror',
      releaseYear: 2022,
      rating: 6.4,
    },
    {
      id: 13,
      title: 'Órbita 9',
      genre: 'Ciencia Ficcion',
      releaseYear: 2018,
      rating: 8.9,
    },
    {
      id: 14,
      title: 'El Último Androide',
      genre: 'Ciencia Ficcion',
      releaseYear: 2023,
      rating: 8.4,
    },
    {
      id: 15,
      title: 'Viaje a Kepler',
      genre: 'Ciencia Ficcion',
      releaseYear: 2016,
      rating: 7.6,
    },
  ];

  /** Lista hasta `countMovies` películas del conjunto de datos. */
  async getAll(countMovies: number): Promise<Movie[]> {
    return MovieDatasource.MOVIES.slice(0, countMovies).map((movie) => ({
      ...movie,
    }));
  }

  /** Retorna la película con el id solicitado o un error 404. */
  async getById(id: number): Promise<Movie> {
    const movie = MovieDatasource.MOVIES.find(
      (candidate) => candidate.id === id,
    );

    if (!movie) {
      throw CustomError.notFound(`No existe una película con el id ${id}`);
    }

    return { ...movie };
  }

  /** Lista las películas del género solicitado. */
  async getByGenre(genre: MovieGenre): Promise<Movie[]> {
    return MovieDatasource.MOVIES.filter(
      (movie) => movie.genre === genre,
    ).map((movie) => ({ ...movie }));
  }
}
