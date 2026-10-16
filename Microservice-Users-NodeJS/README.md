# Microservicio de Usuarios — NodeJS

Microservicio del **Punto 2** del Parcial II, desarrollado con **Node.js + Express + TypeScript**
aplicando **Clean Architecture** y documentado con **Swagger (OpenAPI 3)**.

Es el backend asignado al **Microfrontend de Usuarios** (`http://localhost:4201`).

---

## 📌 Información del servicio

| Ítem | Valor |
|---|---|
| Tecnología | Node.js + Express 5 + TypeScript |
| Puerto | `3001` |
| Swagger UI | `http://localhost:3001/api/docs` |
| Base de la API | `http://localhost:3001/api/users` |
| Microfrontend que lo consume | `Microfrontend-Users-Angular` (`http://localhost:4201`) |

---

## 🎯 Casos de uso (3)

| # | Caso de uso | Endpoint | Descripción |
|---|---|---|---|
| 1 | `GetAllUsersUseCase` | `GET /api/users/{countUsers}` | Lista hasta `countUsers` usuarios del conjunto de datos (1–100) |
| 2 | `GetUserByIdUseCase` | `GET /api/users/id/{id}` | Retorna el usuario con el id solicitado |
| 3 | `GetUsersByEngineeringUseCase` | `GET /api/users/engineering/{engineering}` | Lista los usuarios de la ingeniería (4) |

Ingenierías válidas: `Sistemas`, `Electronica`, `Biomedica`, `Industrial`, `Ambiental`.

Los datos provienen de un conjunto fijo de **20 usuarios semilla** (4 por ingeniería), por lo
que las consultas son deterministas: listar dos veces retorna lo mismo, y los filtrados son
subconjuntos del listado completo. Un id inexistente responde `404` con `{ "error": "..." }`.

Parámetros inválidos responden `400` con `{ "error": "..." }`.

**Modelo `User`:** `id`, `name`, `lastName`, `age` (18–65), `email`, `engineering`.

---

## 🧱 Clean Architecture

```
src/
├── domain/                          ← Entidades y contratos (sin dependencias externas)
│   ├── errors/                      CustomError
│   ├── models/                      User + ingenierías válidas
│   └── repositories/                UserRepository (contrato abstracto)
├── application/                     ← Reglas de negocio
│   └── usecases/                    3 casos de uso
├── infrastructure/                  ← Frameworks & Drivers
│   ├── datasources/                 Datos semilla en memoria (deterministas)
│   ├── repositories/                UserRepositoryImpl
│   └── web/                         Servidor Express, rutas, controlador, Swagger
├── dependency-injection/            Composition Root (Container)
└── app.ts                           Punto de entrada
```

**Flujo:** `Route → Controller → UseCase → Repository (contrato) ← RepositoryImpl → Datasource`

Las dependencias apuntan siempre hacia el dominio: los casos de uso conocen el contrato
`UserRepository`, y la infraestructura provee la implementación concreta mediante el
contenedor de inyección de dependencias.

---

## ▶️ Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor (modo desarrollo)
npm start
```

- API: `http://localhost:3001/api/users/10`
- Swagger: `http://localhost:3001/api/docs`
- Página informativa: `http://localhost:3001`

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

Cubren las cuatro capas: casos de uso (validaciones incluidas), datasource (consistencia de
los datos semilla), repositorio (delegación) y controlador (códigos HTTP y manejo de errores).

---

## 💻 Ejemplos de consumo

```bash
curl http://localhost:3001/api/users/10
curl http://localhost:3001/api/users/id/3
curl http://localhost:3001/api/users/engineering/Sistemas
```

Respuesta típica:

```json
[
  {
    "id": 1,
    "name": "Carlos",
    "lastName": "Ramírez",
    "age": 22,
    "email": "carlos.ramirez@uceva.edu.co",
    "engineering": "Sistemas"
  }
]
```
