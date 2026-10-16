# Microfrontend-Products-Angular

Microfrontend de **Productos** (Angular 20 + Module Federation), expuesto como remoto
`mf-products`. Aplica **Clean Architecture** y consume el microservicio de productos
(Punto 2) a través de un repositorio (patrón Repository / API Gateway).

- **Puerto:** `4202`
- **RemoteEntry:** `http://localhost:4202/remoteEntry.js`
- **Módulo expuesto:** `./ProductsPage`
- **Microservicio asociado:** MS Productos — `http://localhost:3002`

## Casos de uso

| # | Caso de uso | Descripción |
|---|---|---|
| 1 | `GetAllProductsUseCase` | Listar todos los productos |
| 2 | `GetProductByIdUseCase` | Buscar un producto por id |
| 3 | `GetProductsByCategoryUseCase` | Filtrar por categoría |

Modelo `Product`: `id`, `name`, `category`, `price`.
`ProductCategory = 'Lacteos' | 'Carnes' | 'Frutas' | 'Verduras'`.

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

- `ProductNodeRepositoryImpl` — consume `http://localhost:3002` vía `environment.baseUrl` (**activo por defecto**).
- `ProductLocalRepositoryImpl` — datos simulados con `@faker-js/faker` (alternativa sin microservicio).

El proveedor se define a nivel de componente en
`src/app/presentation/pages/products/products.page.ts`. Comenta/descomenta el `useClass`
correspondiente para alternar.

## Comandos

```bash
npm i                 # instalar dependencias
npm start             # dev server en http://localhost:4202
npm run build         # build de producción
npm test              # pruebas (Jest)
npm run test:coverage # pruebas + cobertura
npm run compodoc      # documentación
```

## Endpoints (implementación Node)

| Caso de uso | Endpoint |
|---|---|
| Listar | `GET /api/products/{count}` |
| Por id | `GET /api/products/id/{id}` |
| Por categoría | `GET /api/products/category/{category}` |
