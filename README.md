# 🧪 Parcial II — Punto 1: Microfrontends (Angular + Module Federation)

Implementación del **Punto 1** del Parcial II: una arquitectura de **microfrontends**
construida con **Angular 20** y **Module Federation**, compuesta por un **host** y
**tres microfrontends independientes** integrados mediante *remote entries*.

Cada microfrontend aplica los principios de **Clean Architecture** (Arquitectura Limpia),
separando sus responsabilidades por capas y exponiendo **tres casos de uso** para un total
de **nueve casos de uso** en el frontend. La comunicación con el microservicio asignado se
realiza a través de **repositorios** (patrón Repository) que actúan como *API Gateway*.

> Punto 2 (microservicios) es desarrollado por otro integrante del grupo. Este repositorio
> solo contiene el **Punto 1 (microfrontends)**.

---

## 📐 Arquitectura general

```
┌─────────────────────────────────────────────────────────────┐
│                    Client-Host-Angular (:4200)              │
│  Navbar  →  /users  ·  /products  ·  /movies                │
└───────────────┬───────────────┬───────────────┬─────────────┘
                │ loadRemoteModule (Module Federation)
      remoteEntry.js        remoteEntry.js       remoteEntry.js
                │               │                     │
      ┌─────────▼──────┐ ┌──────▼─────────┐ ┌─────────▼───────┐
      │ MF Usuarios    │ │ MF Productos   │ │ MF Películas    │
      │   (:4201)      │ │   (:4202)      │ │   (:4203)       │
      └─────────┬──────┘ └──────┬─────────┘ └─────────┬───────┘
                │               │                     │
        Repository (API Gateway / Local faker)
                │               │                     │
      ┌─────────▼──────┐ ┌──────▼─────────┐ ┌─────────▼───────┐
      │ MS Usuarios    │ │ MS Productos   │ │ MS Películas    │
      │   (:3001)      │ │   (:3002)      │ │   (:3003)       │
      │   (Punto 2)    │ │   (Punto 2)    │ │   (Punto 2)     │
      └────────────────┘ └────────────────┘ └─────────────────┘
```

---

## 📦 Proyectos del monorepo

| Proyecto | Tipo | Puerto | RemoteEntry | Microservicio que consume |
|---|---|---|---|---|
| `Client-Host-Angular` | Host | `4200` | — | — (carga los 3 remotos) |
| `Microfrontend-Users-Angular` | Microfrontend | `4201` | `http://localhost:4201/remoteEntry.js` | MS Usuarios — `http://localhost:3001` |
| `Microfrontend-Products-Angular` | Microfrontend | `4202` | `http://localhost:4202/remoteEntry.js` | MS Productos — `http://localhost:3002` |
| `Microfrontend-Movies-Angular` | Microfrontend | `4203` | `http://localhost:4203/remoteEntry.js` | MS Películas — `http://localhost:3003` |

### Rutas del host

| Ruta | Microfrontend | Módulo expuesto |
|---|---|---|
| `/users` | `Microfrontend-Users-Angular` | `./UsersPage` |
| `/products` | `Microfrontend-Products-Angular` | `./ProductsPage` |
| `/movies` | `Microfrontend-Movies-Angular` | `./MoviesPage` |
| `**` (wildcard) | Redirige a `/users` | — |

---

## 🧱 Clean Architecture en cada microfrontend

Cada microfrontend replica la misma organización por capas:

```
src/app/
├── core/
│   ├── domain/                       ← Capa de Dominio (reglas de negocio)
│   │   ├── models/                   Modelos de entidad (User / Product / Movie)
│   │   └── repositories/             Contrato abstracto del repositorio
│   ├── application/                  ← Capa de Aplicación
│   │   └── usecases/                 3 casos de uso por microfrontend
│   └── infrastructure/               ← Capa de Infraestructura
│       ├── repositories/
│       │   ├── local-implementation/ Implementación Local (faker)
│       │   └── node-implementation/  Implementación Node (HTTP al microservicio)
│       └── services/                 DataService (HttpClient)
├── presentation/                     ← Capa de Presentación
│   ├── pages/                        Página contenedora (consume los casos de uso)
│   ├── components/                   Tabla y alerta
│   └── interfaces/                   Estado de la UI
└── mocks/                            Datos de prueba para los specs
```

**Flujo de dependencias:** `Presentation → Application (use cases) → Domain (repository)`
`← Infrastructure` implementa el contrato de dominio y se inyecta mediante DI.

---

## 🎯 Casos de uso (9 en total)

### Microfrontend de Usuarios
| # | Caso de uso | Descripción | Endpoint (impl. Node) |
|---|---|---|---|
| 1 | `GetAllUsersUseCase` | Listar todos los usuarios | `GET /api/users/{count}` |
| 2 | `GetUserByIdUseCase` | Buscar un usuario por id | `GET /api/users/id/{id}` |
| 3 | `GetUsersByEngineeringUseCase` | Filtrar por ingeniería | `GET /api/users/engineering/{engineering}` |

### Microfrontend de Productos
| # | Caso de uso | Descripción | Endpoint (impl. Node) |
|---|---|---|---|
| 4 | `GetAllProductsUseCase` | Listar todos los productos | `GET /api/products/{count}` |
| 5 | `GetProductByIdUseCase` | Buscar un producto por id | `GET /api/products/id/{id}` |
| 6 | `GetProductsByCategoryUseCase` | Filtrar por categoría | `GET /api/products/category/{category}` |

### Microfrontend de Películas
| # | Caso de uso | Descripción | Endpoint (impl. Node) |
|---|---|---|---|
| 7 | `GetAllMoviesUseCase` | Listar todas las películas | `GET /api/movies/{count}` |
| 8 | `GetMovieByIdUseCase` | Buscar una película por id | `GET /api/movies/id/{id}` |
| 9 | `GetMoviesByGenreUseCase` | Filtrar por género | `GET /api/movies/genre/{genre}` |

### Modelos de dominio

| Microfrontend | Modelo | Atributos |
|---|---|---|
| Usuarios | `User` | `id`, `name`, `lastName`, `age`, `email`, `engineering` |
| Productos | `Product` | `id`, `name`, `category`, `price` |
| Películas | `Movie` | `id`, `title`, `genre`, `releaseYear`, `rating` |

Tipos de filtrado:
`UserEngineering = 'Sistemas' | 'Electronica' | 'Biomedica' | 'Industrial' | 'Ambiental'`
`ProductCategory = 'Lacteos' | 'Carnes' | 'Frutas' | 'Verduras'`
`MovieGenre = 'Accion' | 'Comedia' | 'Drama' | 'Terror' | 'Ciencia Ficcion'`

---

## 🔀 Repositorios: Local (faker) vs. Node (microservicio)

Cada microfrontend define un contrato abstracto de repositorio en la capa de dominio
(`UserRepository`, `ProductRepository`, `MovieRepository`) con dos implementaciones:

- **`*LocalRepositoryImpl`** → genera datos simulados con **`@faker-js/faker`** (no hace
  peticiones HTTP). **Activada por defecto**, para poder ejecutar y probar los
  microfrontends sin necesidad de que los microservicios (Punto 2) estén levantados.
- **`*NodeRepositoryImpl`** → consume el microservicio real mediante `DataService`
  (`HttpClient`) usando `environment.baseUrl`. **Comentada por defecto**.

El proveedor se registra a **nivel de componente** en la página contenedora
(`*.page.ts`), de modo que la inyección de dependencias funciona tanto en modo
*standalone* como cuando el host carga el remoto por Module Federation.

Para alternar entre Local y Node, edita los `providers` de la página
(`src/app/presentation/pages/*/*.page.ts`):

```ts
providers: [
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  GetUsersByEngineeringUseCase,

  // Implementación LOCAL (datos simulados con faker)
  { provide: UserRepository, useClass: UserLocalRepositoryImpl },

  // Implementación NODE (consume Microservice-Users-NodeJS en :3001)
  // { provide: UserRepository, useClass: UserNodeRepositoryImpl },
],
```

> Al activar la implementación Node, recuerda que el host ya provee
> `provideHttpClient()`, por lo que las peticiones HTTP funcionan dentro de la
> aplicación federada. Los microservicios son responsabilidad del Punto 2.

---

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) (v24 recomendado) y **npm**
- **Angular CLI** (`npm i -g @angular/cli`) — verifica con `ng version`
- **Git** y **Visual Studio Code** (opcional)

---

## ⚙️ Instalación

### Opción 1 — Desde la raíz del monorepo (recomendado)

En la raíz de `Parcial II` ejecuta **una sola vez**:

```bash
npm install
```

Esto instala `concurrently` en la raíz y, mediante el script `postinstall`, instala
automáticamente las dependencias de **los cuatro proyectos** (`Client-Host-Angular` y los
tres microfrontends) en paralelo.

### Opción 2 — Proyecto por proyecto

```bash
# Host
cd Client-Host-Angular && npm i && cd ..

# Microfrontends
cd Microfrontend-Users-Angular && npm i && cd ..
cd Microfrontend-Products-Angular && npm i && cd ..
cd Microfrontend-Movies-Angular && npm i && cd ..
```

---

## ▶️ Ejecución

Se debe levantar **primero los microfrontends** (remotos) y **después el host**, ya que el
host consume sus `remoteEntry.js`.

### Opción 1 — Desde la raíz del monorepo (recomendado)

```bash
# En la raíz de Parcial II (después de npm install)
npm start
```

Levanta al mismo tiempo los tres microfrontends (`4201`, `4202`, `4203`) y el host
(`4200`) usando `concurrently`. El host **espera a que los tres remotos estén disponibles**
(sus `remoteEntry.js`) antes de arrancar y, al terminar de compilar, **abre automáticamente
el navegador en http://localhost:4200**.

Otros scripts de la raíz:

```bash
npm test            # pruebas unitarias de los cuatro proyectos
npm run build       # build de producción de los cuatro proyectos
npm run compodoc    # genera la documentación de los cuatro proyectos y la abre
```

### Opción 2 — Cada proyecto por separado

En **4 terminales** distintas:

```bash
# Terminal 1 — Microfrontend Usuarios
cd Microfrontend-Users-Angular && npm start        # http://localhost:4201

# Terminal 2 — Microfrontend Productos
cd Microfrontend-Products-Angular && npm start     # http://localhost:4202

# Terminal 3 — Microfrontend Películas
cd Microfrontend-Movies-Angular && npm start       # http://localhost:4203

# Terminal 4 — Host
cd Client-Host-Angular && npm start                # http://localhost:4200
```

Luego abre: **http://localhost:4200**

### Verificación de puertos

| Servicio | URL | Comprobación |
|---|---|---|
| Host | `http://localhost:4200` | Navbar + rutas |
| MF Usuarios | `http://localhost:4201/remoteEntry.js` | Devuelve el `remoteEntry.js` |
| MF Productos | `http://localhost:4202/remoteEntry.js` | Devuelve el `remoteEntry.js` |
| MF Películas | `http://localhost:4203/remoteEntry.js` | Devuelve el `remoteEntry.js` |

> También puedes ejecutar cada microfrontend de forma independiente en
> `http://localhost:420X` para ver su página directamente.

---

## 🧪 Pruebas unitarias y cobertura

Cada proyecto usa **Jest** (`jest-preset-angular`) con cobertura habilitada y supera el
**90%** exigido (los microfrontends alcanzan **100%**).

```bash
# Desde la raíz del monorepo: ejecuta las pruebas de los cuatro proyectos
npm test

# Por proyecto
cd Microfrontend-Users-Angular && npm test

# Ejecutar con reporte de cobertura (por proyecto)
cd Microfrontend-Users-Angular && npm run test:coverage

# Modo watch (por proyecto)
cd Microfrontend-Users-Angular && npm run test:watch
```

> `npm test` en la raíz ejecuta los proyectos **uno tras otro (no en paralelo)** para evitar
> que los cuatro procesos de Jest agoten la memoria. Resultado esperado: **137 pruebas**
> (5 del host + 44 × 3 microfrontends), todas en verde.

El reporte HTML queda en `coverage/` dentro de cada proyecto.

| Proyecto | Pruebas | Cobertura |
|---|---|---|
| `Client-Host-Angular` | 5 | 100% |
| `Microfrontend-Users-Angular` | 44 | 100% |
| `Microfrontend-Products-Angular` | 44 | 100% |
| `Microfrontend-Movies-Angular` | 44 | 100% |
| **Total** | **137** | **100%** |

---

## 🏗️ Build de producción

```bash
# Desde la raíz del monorepo: compila los cuatro proyectos
npm run build

# O por proyecto
cd Client-Host-Angular && npm run build
cd Microfrontend-Users-Angular && npm run build
cd Microfrontend-Products-Angular && npm run build
cd Microfrontend-Movies-Angular && npm run build
```

Los artefactos se generan en `dist/<NombreDelProyecto>`. El host resuelve los remotos por
URL absoluta (`http://localhost:420X/remoteEntry.js`), por lo que en producción basta con
servir cada `dist/` y ajustar dichas URLs en `Client-Host-Angular/src/app/app.routes.ts`.

---

## 📚 Documentación (Compodoc)

Cada proyecto incluye JSDoc por capas y puede generar documentación con Compodoc. Al
terminar, **el comando abre automáticamente el `documentation/index.html` generado** en el
navegador.

Desde la raíz del monorepo (genera y abre la de los cuatro proyectos):

```bash
npm run compodoc
```

O por proyecto:

```bash
cd Microfrontend-Users-Angular && npm run compodoc
```

El resultado queda en `documentation/index.html` dentro de cada proyecto. Si prefieres
levantarlo con un servidor en vivo (no termina el comando):

```bash
npx compodoc -p tsconfig.doc.json -s -o
```

---

## 🛠️ Tecnologías

- **Angular 20.3.14** (standalone components, signals-ready)
- **Module Federation** — `@angular-architects/module-federation` + `ngx-build-plus`
- **Jest 30** + `jest-preset-angular 15` (cobertura con `collectCoverage`)
- **Bootstrap 5.3.8** y **`@brejcha13320/design-system-bootstrap`** (navbar, badges, iconos)
- **`@faker-js/faker`** para la implementación Local de los repositorios
- **Compodoc** para la documentación

---

## 👥 Integrantes y reparto

- **Jose-Alejandro-Loaiza-Lopez** — Punto 1: Desarrollo de Microfrontends
- **Angel-Cuero** — Punto 2: Desarrollo de Microservicios
