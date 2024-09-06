# Codebase structure

This project is organized into several directories and files, as outlined below:

```
├── .github/
├── docs/
├── libs/
├── src/
├── package.json
├── README.md
├── Dockerfile
├── docker-compose.yml

```
Among these, the `libs` and `src` directories serve as the two primary components of the project.


## Source code
### libs
This folder contains three essential subfolders: `common`, `core`, and `database`. The purpose of this design is to serve as a centralized location for all shared code, which can be utilized or implemented across all services and modules within the `src` folder.

This folder contains three essential subfolders: `common`, `core`, and `database`.
- The `commo`n folder is dedicated to storing code that can be used across the project, including **helpers**, **repositories**, **enum**, **dto** and similar utilities.
- The `core` folder contains code tailored to specific requirements, such as **validators** and **decorators**, as well as customized or extended code that functions exclusively for certain services or modules.
- Lastly, the `database` folder serves as the repository for migration files, schema definitions, and seed files."

```
├── common
│  ├── constants
│  ├── dtos
│  ├── enums
│  ├── helpers
│  ├── repositories
│  └── responses
├── configs
├── core
│  ├── decorators
│  └── validators
└── database
  ├── migrations
  ├── schema.prisma
  ├── seed.ts
  ├── seeder-factory.ts
  └── seeders
```

---

### src
This folder is the heart of the repository, serving as the central hub for all services and modules. It plays a crucial role in managing the business logic, ensuring that all core functionalities are organized and accessible.

Basing on the [**Coding Assessment**](backend-nodejs-coding-assessment.md), the `src` folder will include the following components:
- `auth` module manages authentication using JSON Web Tokens (JWT) for secure user verification and access control.
- `message` module handles sending and receiving messages, facilitating communication between users.
- `prisma` module is responsible for instantiating the Prisma Client and connecting to the database for efficient data access.
- `user` module validates user information, ensuring compliance with required specifications.
- `websocket` module adds real-time chat communication as a bonus feature, enhancing user interaction within the application.

```
├── auth
│  ├── auth.controller.ts
│  ├── auth.module.ts
│  ├── auth.service.spec.ts
│  ├── auth.service.ts
│  └── jwt
│    ├── jwt-auth.guard.ts
│    └── jwt-auth.strategy.ts
├── message
│  ├── message.controller.ts
│  ├── message.module.ts
│  ├── message.service.spec.ts
│  └── message.service.ts
├── prisma
│  ├── prisma.module.ts
│  └── prisma.service.ts
├── user
│  ├── user.module.ts
│  ├── user.service.spec.ts
│  └── user.service.ts
└── websocket
  ├── chat
  └── websocket.module.ts
├── main.ts
├── app.module.ts

```
