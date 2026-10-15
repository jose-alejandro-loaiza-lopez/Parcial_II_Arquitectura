# Microfrontend-Users-Angular

Microfrontend de **Usuarios** (Angular 20 + Module Federation), expuesto como remoto
`mf-users`. Aplica **Clean Architecture** y consume el microservicio de usuarios (Punto 2)
a través de un repositorio (patrón Repository / API Gateway).

- **Puerto:** `4201`
- **RemoteEntry:** `http://localhost:4201/remoteEntry.js`
- **Módulo expuesto:** `./UsersPage`
- **Microservicio asociado:** MS Usuarios — `http://localhost:3001`

## Casos de uso

| # | Caso de uso | Descripción |
|---|---|---|
| 1 | `GetAllUsersUseCase` | Listar todos los usuarios |
| 2 | `GetUserByIdUseCase` | Buscar un usuario por id |
| 3 | `GetUsersByEngineeringUseCase` | Filtrar por ingeniería |

Modelo `User`: `id`, `name`, `lastName`, `age`, `email`, `engineering`.
`UserEngineering = 'Sistemas' | 'Electronica' | 'Biomedica' | 'Industrial' | 'Ambiental'`.

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

- `UserLocalRepositoryImpl` — datos simulados con `@faker-js/faker` (**activo por defecto**).
- `UserNodeRepositoryImpl` — consume `http://localhost:3001` vía `environment.baseUrl`.

El proveedor se define a nivel de componente en
`src/app/presentation/pages/users/users.page.ts`. Comenta/descomenta el `useClass`
correspondiente para alternar.

## Comandos

```bash
npm i                 # instalar dependencias
npm start             # dev server en http://localhost:4201
npm run build         # build de producción
npm test              # pruebas (Jest)
npm run test:coverage # pruebas + cobertura
npm run compodoc      # documentación
```

## Endpoints (implementación Node)

| Caso de uso | Endpoint |
|---|---|
| Listar | `GET /api/users/{count}` |
| Por id | `GET /api/users/id/{id}` |
| Por ingeniería | `GET /api/users/engineering/{engineering}` |
