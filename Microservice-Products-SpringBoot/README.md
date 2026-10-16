# Microservicio de Productos — Spring Boot

Microservicio del **Punto 2** del Parcial II, desarrollado con **Spring Boot 4 + Java 25**
aplicando **Clean Architecture** y documentado con **Swagger (springdoc OpenAPI)**.

Es el backend asignado al **Microfrontend de Productos** (`http://localhost:4202`).

---

## 📌 Información del servicio

| Ítem | Valor |
|---|---|
| Tecnología | Java 25 + Spring Boot 4.0.1 + Gradle |
| Puerto | `3002` |
| Swagger UI | `http://localhost:3002/api/swagger-ui/index.html` |
| OpenAPI JSON | `http://localhost:3002/api/v3/api-docs` |
| Base de la API | `http://localhost:3002/api/products` |
| Microfrontend que lo consume | `Microfrontend-Products-Angular` (`http://localhost:4202`) |

> El *context path* de la aplicación es `/api` (configurado en
> `src/main/resources/application.properties`).

---

## 🎯 Casos de uso (3)

| # | Caso de uso | Endpoint | Descripción |
|---|---|---|---|
| 1 | `GetAllProductsUseCase` | `GET /api/products/{countProducts}` | Lista `countProducts` productos (1–100) |
| 2 | `GetProductByIdUseCase` | `GET /api/products/id/{id}` | Retorna el producto con el id solicitado |
| 3 | `GetProductsByCategoryUseCase` | `GET /api/products/category/{category}` | Lista productos de la categoría (5) |

Categorías válidas: `Lacteos`, `Carnes`, `Frutas`, `Verduras`.

Parámetros inválidos responden `400` con `{ "error": "..." }` gracias al
`GlobalExceptionHandler`.

**Modelo `Product`:** `id`, `name`, `category`, `price` (pesos colombianos).

---

## 🧱 Clean Architecture

```
src/main/java/uceva/products/
├── domain/                          ← Entidades y contratos (sin dependencias de framework)
│   ├── entity/                      Product + categorías válidas
│   └── repository/                  ProductRepository (contrato abstracto)
├── application/                     ← Reglas de negocio
│   └── usecase/                     3 casos de uso
├── infrastructure/                  ← Frameworks & Drivers
│   ├── datasource/                  Generación de datos con JavaFaker
│   ├── repository/                  ProductRepositoryImpl
│   └── controller/                  ProductController + GlobalExceptionHandler
├── config/                          Composition Root (AppConfig), CORS y OpenAPI
└── MicroserviceProductsApplication  Punto de entrada
```

**Flujo:** `Controller → UseCase → Repository (contrato) ← RepositoryImpl → Datasource`

Las dependencias apuntan siempre hacia el dominio: los casos de uso conocen el contrato
`ProductRepository`, y `AppConfig` inyecta la implementación concreta.

---

## ▶️ Ejecución

Requisitos: **JDK 25** (usa el wrapper de Gradle incluido, no requiere Gradle instalado).

```bash
# Windows
gradlew.bat bootRun

# Linux / macOS
./gradlew bootRun
```

- API: `http://localhost:3002/api/products/10`
- Swagger: `http://localhost:3002/api/swagger-ui/index.html`

Otros comandos:

```bash
gradlew.bat test     # Pruebas (JUnit)
gradlew.bat build    # Compila y empaqueta el jar en build/libs/
```

---

## 💻 Ejemplos de consumo

```bash
curl http://localhost:3002/api/products/10
curl http://localhost:3002/api/products/id/3
curl http://localhost:3002/api/products/category/Frutas
```

Respuesta típica:

```json
[
  {
    "id": 1,
    "name": "Leche entera",
    "category": "Lacteos",
    "price": 4500.0
  }
]
```
