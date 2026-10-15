# Client-Host-Angular

**Host** de la arquitectura de microfrontends (Angular 20 + Module Federation). Muestra un
navbar funcional y carga de forma perezosa los tres microfrontends remotos mediante
`loadRemoteModule`.

- **Puerto:** `4200`
- **Rutas:** `/users`, `/products`, `/movies` (`**` redirige a `/users`)
- **Provee:** `provideHttpClient()` para que los remotos realicen peticiones HTTP.

## Remotos consumidos

| Ruta | RemoteEntry | Módulo expuesto |
|---|---|---|
| `/users` | `http://localhost:4201/remoteEntry.js` | `./UsersPage` |
| `/products` | `http://localhost:4202/remoteEntry.js` | `./ProductsPage` |
| `/movies` | `http://localhost:4203/remoteEntry.js` | `./MoviesPage` |

> Los remotos deben estar en ejecución antes de levantar el host.

## Comandos

```bash
npm i                 # instalar dependencias
npm start             # dev server en http://localhost:4200
npm run build         # build de producción
npm test              # pruebas (Jest)
npm run compodoc      # documentación
```

## Configuración

- Rutas y remotos: `src/app/app.routes.ts`
- Bootstrap de la aplicación: `src/app/app.config.ts`
- Navbar: `src/app/app.html` / `src/app/app.ts`
