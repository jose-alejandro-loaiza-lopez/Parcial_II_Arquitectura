# Microfrontend-Movies-Angular

Microfrontend de **Películas** (Angular 20 + Module Federation), expuesto como remoto
`mf-movies`. Aplica **Clean Architecture** y consume el microservicio de películas
(Punto 2) a través de un repositorio (patrón Repository / API Gateway).

- **Puerto:** `4203`
- **RemoteEntry:** `http://localhost:4203/remoteEntry.js`
- **Módulo expuesto:** `./MoviesPage`
- **Microservicio asociado:** MS Películas — `http://localhost:3003`

## Casos de uso

| # | Caso de uso | Descripción |
|---|---|---|
| 1 | `GetAllMoviesUseCase` | Listar todas las películas |
| 2 | `GetMovieByIdUseCase` | Buscar una película por id |
| 3 | `GetMoviesByGenreUseCase` | Filtrar por género |

Modelo `Movie`: `id`, `title`, `genre`, `releaseYear`, `rating`.
`MovieGenre = 'Accion' | 'Comedia' | 'Drama' | 'Terror' | 'Ciencia Ficcion'`.

## Estructura (Clean Architecture)

```
src/app/
├── core/
│   ├── domain/{models,repositories}
│   ├── application/usecases
│   └── infrastructure/
│       ├── repositories/{local-implementation,node-implementation}
│       └── services/data.service.ts
├── presentation/{pages,components,interfaces}
└── mocks/
```

## Repositorio: Local vs. Node

- `MovieLocalRepositoryImpl` — datos simulados con `@faker-js/faker` (**activo por defecto**).
- `MovieNodeRepositoryImpl` — consume `http://localhost:3003` vía `environment.baseUrl`.

El proveedor se define a nivel de componente en
`src/app/presentation/pages/movies/movies.page.ts`. Comenta/descomenta el `useClass`
correspondiente para alternar.

## Comandos

```bash
npm i                 # instalar dependencias
npm start             # dev server en http://localhost:4203
npm run build         # build de producción
npm test              # pruebas (Jest)
npm run test:coverage # pruebas + cobertura
npm run compodoc      # documentación
```

## Endpoints (implementación Node)

| Caso de uso | Endpoint |
|---|---|
| Listar | `GET /api/movies/{count}` |
| Por id | `GET /api/movies/id/{id}` |
| Por género | `GET /api/movies/genre/{genre}` |
