# 🧪 Parcial II — Microfrontends + Microservicios (Clean Architecture)

Implementación del **Parcial II** de Arquitectura de Software:

- **Punto 1:** arquitectura de **microfrontends** con **Angular 20** y **Module Federation**
  (un host + tres microfrontends independientes).
- **Punto 2:** tres **microservicios** independientes (**Node.js** y **Spring Boot**)
  aplicando **Clean Architecture** y documentados con **Swagger**.

Cada microfrontend consume su microservicio asignado mediante un **repositorio HTTP**
(patrón Repository) que actúa como *API Gateway*, y cada componente (frontend y backend)
se organiza por capas siguiendo los principios de **Arquitectura Limpia**.

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
                │ HTTP          │ HTTP                │ HTTP
      ┌─────────▼──────┐ ┌──────▼─────────┐ ┌─────────▼───────┐
      │ MS Usuarios    │ │ MS Productos   │ │ MS Películas    │
      │   NodeJS       │ │  Spring Boot   │ │   NodeJS        │
      │   (:3001)      │ │    (:3002)     │ │   (:3003)       │
      │ /api/docs      │ │ swagger-ui     │ │ /api/docs       │
      └────────────────┘ └────────────────┘ └─────────────────┘
```

---

## 📦 Proyectos del monorepo

### Frontend (Punto 1)

| Proyecto | Tipo | Puerto | RemoteEntry | Microservicio que consume |
|---|---|---|---|---|
| `Client-Host-Angular` | Host | `4200` | — | — (carga los 3 remotos) |
| `Microfrontend-Users-Angular` | Microfrontend | `4201` | `http://localhost:4201/remoteEntry.js` | MS Usuarios — `http://localhost:3001` |
| `Microfrontend-Products-Angular` | Microfrontend | `4202` | `http://localhost:4202/remoteEntry.js` | MS Productos — `http://localhost:3002` |
| `Microfrontend-Movies-Angular` | Microfrontend | `4203` | `http://localhost:4203/remoteEntry.js` | MS Películas — `http://localhost:3003` |

### Backend (Punto 2)

| Proyecto | Tecnología | Puerto | Swagger | Microfrontend que lo consume |
|---|---|---|---|---|
| `Microservice-Users-NodeJS` | Node.js + Express + TypeScript | `3001` | `http://localhost:3001/api/docs` | `Microfrontend-Users-Angular` |
| `Microservice-Products-SpringBoot` | Java 25 + Spring Boot 4 + Gradle | `3002` | `http://localhost:3002/api/swagger-ui/index.html` | `Microfrontend-Products-Angular` |
| `Microservice-Movies-NodeJS` | Node.js + Express + TypeScript | `3003` | `http://localhost:3003/api/docs` | `Microfrontend-Movies-Angular` |

> ✅ Se cumple el requisito de **al menos un microservicio en Node.js y otro en Spring Boot**.

### Rutas del host

| Ruta | Microfrontend | Módulo expuesto |
|---|---|---|
| `/users` | `Microfrontend-Users-Angular` | `./UsersPage` |
| `/products` | `Microfrontend-Products-Angular` | `./ProductsPage` |
| `/movies` | `Microfrontend-Movies-Angular` | `./MoviesPage` |
| `**` (wildcard) | Redirige a `/users` | — |

---

## 🧱 Clean Architecture

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
│       │   └── node-implementation/  Implementación HTTP al microservicio
│       └── services/                 DataService (HttpClient)
├── presentation/                     ← Capa de Presentación
│   ├── pages/                        Página contenedora (consume los casos de uso)
│   ├── components/                   Tabla y alerta
│   └── interfaces/                   Estado de la UI
└── mocks/                            Datos de prueba para los specs
```

**Flujo de dependencias:** `Presentation → Application (use cases) → Domain (repository)`
`← Infrastructure` implementa el contrato de dominio y se inyecta mediante DI.

Los microservicios backend replican las mismas capas:

```
src/
├── domain/                           ← Entidades, errores y contratos (sin dependencias de framework)
│   ├── models|entity/                User / Product / Movie
│   └── repositories/                 Contrato abstracto del repositorio
├── application/                      ← Capa de Aplicación
│   └── usecases/                     3 casos de uso por microservicio (9 en total)
├── infrastructure/                   ← Frameworks & Drivers
│   ├── datasources/                  Datos semilla en memoria (deterministas)
│   ├── repositories/                 Implementación del contrato
│   └── web|controller/               Servidor HTTP, rutas y controladores
├── config|dependency-injection/      Composition Root (inyección de dependencias)
└── app.ts|Application.java           Punto de entrada
```

**Flujo de dependencias:** `Route → Controller → UseCase → Repository (contrato)`
`← RepositoryImpl → Datasource`. Las dependencias apuntan siempre hacia el dominio.

---

## 🎯 Casos de uso

### Frontend (9)

| Microfrontend | Casos de uso | Endpoint consumido del microservicio |
|---|---|---|
| Usuarios | `GetAllUsersUseCase`, `GetUserByIdUseCase`, `GetUsersByEngineeringUseCase` | `GET /api/users/{count}`, `GET /api/users/id/{id}`, `GET /api/users/engineering/{engineering}` |
| Productos | `GetAllProductsUseCase`, `GetProductByIdUseCase`, `GetProductsByCategoryUseCase` | `GET /api/products/{count}`, `GET /api/products/id/{id}`, `GET /api/products/category/{category}` |
| Películas | `GetAllMoviesUseCase`, `GetMovieByIdUseCase`, `GetMoviesByGenreUseCase` | `GET /api/movies/{count}`, `GET /api/movies/id/{id}`, `GET /api/movies/genre/{genre}` |

### Backend (9)

| Microservicio | Casos de uso | Endpoints |
|---|---|---|
| `Microservice-Users-NodeJS` | `GetAllUsersUseCase`, `GetUserByIdUseCase`, `GetUsersByEngineeringUseCase` | `GET /api/users/{countUsers}` · `GET /api/users/id/{id}` · `GET /api/users/engineering/{engineering}` |
| `Microservice-Products-SpringBoot` | `GetAllProductsUseCase`, `GetProductByIdUseCase`, `GetProductsByCategoryUseCase` | `GET /api/products/{countProducts}` · `GET /api/products/id/{id}` · `GET /api/products/category/{category}` |
| `Microservice-Movies-NodeJS` | `GetAllMoviesUseCase`, `GetMovieByIdUseCase`, `GetMoviesByGenreUseCase` | `GET /api/movies/{countMovies}` · `GET /api/movies/id/{id}` · `GET /api/movies/genre/{genre}` |

### Modelos de dominio

| Módulo | Modelo | Atributos |
|---|---|---|
| Usuarios | `User` | `id`, `name`, `lastName`, `age`, `email`, `engineering` |
| Productos | `Product` | `id`, `name`, `category`, `price` |
| Películas | `Movie` | `id`, `title`, `genre`, `releaseYear`, `rating` |

Tipos de filtrado:
`UserEngineering = 'Sistemas' | 'Electronica' | 'Biomedica' | 'Industrial' | 'Ambiental'`
`ProductCategory = 'Lacteos' | 'Carnes' | 'Frutas' | 'Verduras'`
`MovieGenre = 'Accion' | 'Comedia' | 'Drama' | 'Terror' | 'Ciencia Ficcion'`

Los microservicios exponen un **conjunto fijo de datos semilla** (20 usuarios, 16 productos y
15 películas): listar, buscar por id y filtrar son deterministas, los filtrados retornan
subconjuntos del mismo listado y un id inexistente responde `404`.

---

## 🔀 Repositorios del microfrontend: Microservicio (HTTP) vs. Local (faker)

Cada microfrontend define un contrato abstracto de repositorio en la capa de dominio
(`UserRepository`, `ProductRepository`, `MovieRepository`) con dos implementaciones:

- **`*NodeRepositoryImpl`** → consume el microservicio real mediante `DataService`
  (`HttpClient`) usando `environment.baseUrl`. **Activada por defecto**, de modo que las
  solicitudes de red quedan visibles en la pestaña *Network* del navegador.
- **`*LocalRepositoryImpl`** → genera datos simulados con **`@faker-js/faker`** (no hace
  peticiones HTTP). Permite ejecutar los microfrontends sin levantar los microservicios.

El proveedor se registra a **nivel de componente** en la página contenedora
(`*.page.ts`). Para alternar entre Microservicio y Local, edita los `providers`:

```ts
providers: [
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  GetUsersByEngineeringUseCase,

  // Implementación MICROSERVICIO (por defecto)
  { provide: UserRepository, useClass: UserNodeRepositoryImpl },

  // Implementación LOCAL (datos simulados con faker, sin microservicio)
  // { provide: UserRepository, useClass: UserLocalRepositoryImpl },
],
```

> **Importante:** con la implementación de microservicio activa, los microfrontends
> requieren que el microservicio correspondiente esté en ejecución (ver ejecución).

---

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) (v24 recomendado) y **npm**
- **Angular CLI** (`npm i -g @angular/cli`) — verifica con `ng version`
- **JDK 25** (solo para el microservicio de productos en Spring Boot; incluye wrapper de
  Gradle, no requiere instalar Gradle)
- **Git** y **Visual Studio Code** (opcional)

---

## ⚙️ Instalación

### Opción 1 — Desde la raíz del monorepo (recomendado)

En la raíz de `Parcial II` ejecuta **una sola vez**:

```bash
npm install
```

Esto instala `concurrently` en la raíz y, mediante el script `postinstall`, instala
automáticamente las dependencias de **los seis proyectos npm** (`Client-Host-Angular`,
los tres microfrontends y los dos microservicios NodeJS) en paralelo.

### Opción 2 — Proyecto por proyecto

```bash
cd Client-Host-Angular && npm i && cd ..
cd Microfrontend-Users-Angular && npm i && cd ..
cd Microfrontend-Products-Angular && npm i && cd ..
cd Microfrontend-Movies-Angular && npm i && cd ..
cd Microservice-Users-NodeJS && npm i && cd ..
cd Microservice-Movies-NodeJS && npm i && cd ..
# El microservicio de Spring Boot resuelve dependencias con Gradle al ejecutarse
```

---

## ▶️ Ejecución

### Opción 1 — Todo el sistema (recomendado)

```bash
# En la raíz (después de npm install)
npm run start:all
```

Levanta al mismo tiempo los **tres microservicios** (`3001`, `3002`, `3003`), los **tres
microfrontends** (`4201`, `4202`, `4203`) y el **host** (`4200`). El host **espera a que
los tres remotos estén disponibles** antes de arrancar y, al terminar de compilar, **abre
automáticamente el navegador en http://localhost:4200**.

### Opción 2 — Microservicios y frontend por separado

```bash
# Terminal 1 — Backend (los 3 microservicios a la vez)
npm run start:services

# Terminal 2 — Frontend (los 3 microfrontends + host)
npm start
```

### Opción 3 — Cada proyecto por separado

En **7 terminales** distintas:

```bash
# Backend
cd Microservice-Users-NodeJS && npm start            # http://localhost:3001
cd Microservice-Products-SpringBoot && gradlew.bat bootRun   # http://localhost:3002
cd Microservice-Movies-NodeJS && npm start           # http://localhost:3003

# Frontend
cd Microfrontend-Users-Angular && npm start          # http://localhost:4201
cd Microfrontend-Products-Angular && npm start       # http://localhost:4202
cd Microfrontend-Movies-Angular && npm start         # http://localhost:4203
cd Client-Host-Angular && npm start                  # http://localhost:4200
```

Luego abre: **http://localhost:4200**

### Verificación de puertos

| Servicio | URL | Comprobación |
|---|---|---|
| Host | `http://localhost:4200` | Navbar + rutas |
| MF Usuarios | `http://localhost:4201/remoteEntry.js` | Devuelve el `remoteEntry.js` |
| MF Productos | `http://localhost:4202/remoteEntry.js` | Devuelve el `remoteEntry.js` |
| MF Películas | `http://localhost:4203/remoteEntry.js` | Devuelve el `remoteEntry.js` |
| MS Usuarios (NodeJS) | `http://localhost:3001/api/docs` | Swagger UI |
| MS Productos (Spring Boot) | `http://localhost:3002/api/swagger-ui/index.html` | Swagger UI |
| MS Películas (NodeJS) | `http://localhost:3003/api/docs` | Swagger UI |

> Para verificar la integración, abre las **DevTools del navegador (F12) → Network** y
> navega entre las rutas: verás las peticiones `GET http://localhost:300X/api/...` que
> cada microfrontend realiza a su microservicio.

---

## 🧪 Pruebas

### Microfrontends (Jest)

Cada proyecto Angular usa **Jest** (`jest-preset-angular`) con cobertura habilitada y
supera el **90%** exigido (los microfrontends alcanzan **100%**).

```bash
# Desde la raíz: ejecuta las pruebas de los cuatro proyectos Angular
npm test

# Reporte con cobertura de un microfrontend
cd Microfrontend-Users-Angular && npm run test:coverage
```

Resultado esperado: **137 pruebas** (5 del host + 44 × 3 microfrontends), todas en verde.
El reporte HTML queda en `coverage/` dentro de cada proyecto.

| Proyecto | Pruebas | Cobertura |
|---|---|---|
| `Client-Host-Angular` | 5 | 100% |
| `Microfrontend-Users-Angular` | 44 | 100% |
| `Microfrontend-Products-Angular` | 44 | 100% |
| `Microfrontend-Movies-Angular` | 44 | 100% |
| **Total** | **137** | **100%** |

### Microservicios (Node test runner + JUnit)

```bash
# Los 3 microservicios a la vez
npm run test:services

# O por separado
cd Microservice-Users-NodeJS && npm test    # node:test + tsx
cd Microservice-Movies-NodeJS && npm test   # node:test + tsx
cd Microservice-Products-SpringBoot && gradlew.bat test   # JUnit
```

Las pruebas backend cubren las capas de casos de uso (validaciones incluidas),
datasource, repositorio y controlador.

### Todo junto

```bash
npm run test:all    # pruebas de Angular + microservicios
```

---

## 🏗️ Build de producción

```bash
# Frontend (4 proyectos Angular)
npm run build

# Backend (2 Node + 1 Spring Boot)
npm run build:services

# Por proyecto
cd Client-Host-Angular && npm run build
cd Microservice-Users-NodeJS && npm run build
cd Microservice-Movies-NodeJS && npm run build
cd Microservice-Products-SpringBoot && gradlew.bat build
```

Los artefactos se generan en `dist/<NombreDelProyecto>` (Angular y Node) y en
`build/libs/` (Spring Boot). El host resuelve los remotos por URL absoluta
(`http://localhost:420X/remoteEntry.js`), por lo que en producción basta con servir cada
`dist/` y ajustar dichas URLs en `Client-Host-Angular/src/app/app.routes.ts`.

---

## 📚 Documentación

### Documentación técnica por proyecto

Cada microfrontend y cada microservicio incluye su propio `README.md` con la descripción
de la arquitectura por capas, sus casos de uso, endpoints y comandos de ejecución.

### Swagger (microservicios)

| Microservicio | Swagger UI | OpenAPI JSON |
|---|---|---|
| MS Usuarios (NodeJS) | `http://localhost:3001/api/docs` | — |
| MS Productos (Spring Boot) | `http://localhost:3002/api/swagger-ui/index.html` | `http://localhost:3002/api/v3/api-docs` |
| MS Películas (NodeJS) | `http://localhost:3003/api/docs` | — |

### Compodoc (microfrontends)

Cada proyecto Angular incluye JSDoc por capas y puede generar documentación con Compodoc.
Al terminar, **el comando abre automáticamente el `documentation/index.html` generado**:

```bash
npm run compodoc
```

El resultado queda en `documentation/index.html` dentro de cada proyecto. Si prefieres
levantarlo con un servidor en vivo (no termina el comando):

```bash
npx compodoc -p tsconfig.doc.json -s -o
```

---

## 🛠️ Tecnologías

**Frontend**

- **Angular 20.3.14** (standalone components, signals-ready)
- **Module Federation** — `@angular-architects/module-federation` + `ngx-build-plus`
- **Jest 30** + `jest-preset-angular 15` (cobertura con `collectCoverage`)
- **Bootstrap 5.3.8** y **`@brejcha13320/design-system-bootstrap`** (navbar, badges, iconos)
- **`@faker-js/faker`** para la implementación Local de los repositorios
- **Compodoc** para la documentación

**Backend**

- **Node.js + Express 5 + TypeScript** (microservicios de usuarios y películas)
- **Swagger** — `swagger-jsdoc` + `swagger-ui-express`
- **Java 25 + Spring Boot 4.0.1 + Gradle** (microservicio de productos)
- **springdoc-openapi** para Swagger
- Datasources en memoria con datos semilla deterministas (sin faker)

---

## 👥 Integrantes y reparto

- **Jose-Alejandro-Loaiza-Lopez** — Punto 1: Desarrollo de Microfrontends
- **Angel-Cuero** — Punto 2: Desarrollo de Microservicios
