# ToDoAppBackend

Backend para una aplicación de tareas (ToDo) construido con NestJS y TypeScript.

## Características
- Autenticación JWT (login, protección de rutas). Implementado en [`AuthModule`](src/auth/auth.module.ts) y [`AuthService`](src/auth/auth.service.ts).  
- CRUD de tareas (modelos, DTOs y esquemas). Implementado en [`TasksModule`](src/tasks/tasks.module.ts) y [`TasksService`](src/tasks/tasks.service.ts).  
- Gestión de usuarios (registro/almacenamiento). Implementado en [`UsersModule`](src/users/users.module.ts) y [`UsersService`](src/users/users.service.ts).  
- Validación mediante DTOs y esquemas Mongoose.  
- Pruebas unitarias y e2e con Jest.

## Tecnologías
- NestJS (framework) — [src/app.module.ts](src/app.module.ts)  
- TypeScript — [tsconfig.json](tsconfig.json)  
- Mongoose (esquemas en /schemas) — ejemplos: [`task.schema`](src/tasks/schemas/task.schema.ts), [`user.schema`](src/users/schemas/user.schema.ts)  
- JWT (estrategia) — [`JwtStrategy`](src/auth/strategies/JwtStrategy.ts)  
- Jest para tests — [test/app.e2e-spec.ts](test/app.e2e-spec.ts), [test/jest-e2e.json](test/jest-e2e.json)  
- Docker Compose — [docker-compose.yml](docker-compose.yml)  
- Linter/format: ESLint / Prettier — [eslint.config.mjs](eslint.config.mjs), [.prettierrc](.prettierrc)

## Estructura principal
- [src/main.ts](src/main.ts) — Entrada de la app  
- [src/app.module.ts](src/app.module.ts) — Módulo raíz  
- Auth:
  - [`AuthModule`](src/auth/auth.module.ts)  
  - [`AuthController`](src/auth/auth.controller.ts)  
  - [`AuthService`](src/auth/auth.service.ts)  
  - [`AuthGuard`](src/auth/auth.guard.ts)  
  - DTOs: [`loginUser.dto`](src/auth/dto/loginUser.dto.ts)  
  - Interfaces: [`jwtPayload.interface`](src/auth/interface/jwtPayload.interface.ts)  
  - Estrategia: [`JwtStrategy`](src/auth/strategies/JwtStrategy.ts)  
- Tasks:
  - [`TasksModule`](src/tasks/tasks.module.ts)  
  - [`TasksController`](src/tasks/tasks.controller.ts)  
  - [`TasksService`](src/tasks/tasks.service.ts)  
  - DTOs: [`createTask.dto`](src/tasks/dto/createTask.dto.ts)  
  - Interfaces: [`task.interface`](src/tasks/interface/task.interface.ts)  
  - Esquema: [`task.schema`](src/tasks/schemas/task.schema.ts)  
- Users:
  - [`UsersModule`](src/users/users.module.ts)  
  - [`UsersService`](src/users/users.service.ts)  
  - DTOs: [`createUser.dto`](src/users/dto/createUser.dto.ts)  
  - Esquema: [`user.schema`](src/users/schemas/user.schema.ts)

Desarrollado con ❤️ usando Nest.js
