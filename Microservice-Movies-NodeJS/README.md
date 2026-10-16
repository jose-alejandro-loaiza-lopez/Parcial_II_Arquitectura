# Microservicio de Películas — NodeJS

Microservicio del **Punto 2** del Parcial II, desarrollado con **Node.js + Express + TypeScript**
aplicando **Clean Architecture** y documentado con **Swagger (OpenAPI 3)**.

Es el backend asignado al **Microfrontend de Películas** (`http://localhost:4203`).

---

## 📌 Información del servicio

| Ítem | Valor |
|---|---|
| Tecnología | Node.js + Express 5 + TypeScript |
| Puerto | `3003` |
| Swagger UI | `http://localhost:3003/api/docs` |
| Base de la API | `http://localhost:3003/api/movies` |
| Microfrontend que lo consume | `Microfrontend-Movies-Angular` (`http://localhost:4203`) |

---

## 🎯 Casos de uso (3)

| # | Caso de uso | Endpoint | Descripción |
|---|---|---|---|
| 1 | `GetAllMoviesUseCase` | `GET /api/movies/{countMovies}` | Lista `countMovies` películas (1–100) |
| 2 | `GetMovieByIdUseCase` | `GET /api/movies/id/{id}` | Retorna la película con el id solicitado |
| 3 | `GetMoviesByGenreUseCase` | `GET /api/movies/genre/{genre}` | Lista películas del género (5) |

Géneros válidos: `Accion`, `Comedia`, `Drama`, `Terror`, `Ciencia Ficcion`.

Parámetros inválidos responden `400` con `{ "error": "..." }`.

**Modelo `Movie`:** `id`, `title`, `genre`, `releaseYear` (1970–2024), `rating` (1–10).

---

## 🧱 Clean Architecture

```
src/
├── domain/                          ← Entidades y contratos (sin dependencias externas)
│   ├── errors/                      CustomError
│   ├── models/                      Movie + géneros válidos
│   └── repositories/                MovieRepository (contrato abstracto)
├── application/                     ← Reglas de negocio
│   └── usecases/                    3 casos de uso
├── infrastructure/                  ← Frameworks & Drivers
│   ├── datasources/                 Generación de datos con faker
│   ├── repositories/                MovieRepositoryImpl
│   └── web/                         Servidor Express, rutas, controlador, Swagger
├── dependency-injection/            Composition Root (Container)
└── app.ts                           Punto de entrada
```

**Flujo:** `Route → Controller → UseCase → Repository (contrato) ← RepositoryImpl → Datasource`

Las dependencias apuntan siempre hacia el dominio: los casos de uso conocen el contrato
`MovieRepository`, y la infraestructura provee la implementación concreta mediante el
contenedor de inyección de dependencias.

---

## ▶️ Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor (modo desarrollo)
npm start
```

- API: `http://localhost:3003/api/movies/10`
- Swagger: `http://localhost:3003/api/docs`
- Página informativa: `http://localhost:3003`

Otros scripts:

```bash
npm run build   # Compila TypeScript a dist/
npm test        # Pruebas unitarias (node:test + tsx)
```

---

## 🧪 Pruebas

```bash
npm test
```

Cubren las cuatro capas: casos de uso (validaciones incluidas), datasource (faker),
repositorio (delegación) y controlador (códigos HTTP y manejo de errores).

---

## 💻 Ejemplos de consumo

```bash
curl http://localhost:3003/api/movies/10
curl http://localhost:3003/api/movies/id/3
curl "http://localhost:3003/api/movies/genre/Ciencia%20Ficcion"
```

Respuesta típica:

```json
[
  {
    "id": 1,
    "title": "quos dolorum nam",
    "genre": "Drama",
    "releaseYear": 1994,
    "rating": 8.6
  }
]
```
