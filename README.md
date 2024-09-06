# Qualgo API
<h1 align="center">
  <br>
  NODEJS CODING ASSESSMENT
  <br>
</h1>

[![forthebadge](https://forthebadge.com/images/badges/code-done-bugs-none.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/Ileriayo/markdown-badges)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://github.com/Ileriayo/markdown-badges)
[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://github.com/Ileriayo/markdown-badges)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://github.com/Ileriayo/markdown-badges)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://github.com/Ileriayo/markdown-badges)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/Ileriayo/markdown-badges)

&nbsp;

# Stack

- Typescript [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

- Docker [https://docs.docker.com/](https://docs.docker.com/)

- NestJS framework [https://docs.nestjs.com/](https://docs.nestjs.com/)

  - class-validator [https://docs.nestjs.com/techniques/validation](https://docs.nestjs.com/techniques/validation)

  - class-transformer [https://docs.nestjs.com/techniques/serialization](https://docs.nestjs.com/techniques/serialization)

- Prisma (mysql) [https://www.prisma.io/docs](https://www.prisma.io/docs)

- Swagger [https://docs.nestjs.com/openapi/introduction](https://docs.nestjs.com/openapi/introduction)

  

# Recommended Tools

Here are some recommended tools that may enhance your productivity and streamline your workflow process:

- [**Visual Studio Code**](https://code.visualstudio.com/): Completely free and with built-in Git support and huge extension library, it’s widely used, especially by frontend developers.

- [**Docker Desktop**](https://www.docker.com/products/docker-desktop/): The #1 containerization software for developers and teams

- [**Postman**](https://www.postman.com/): API platform for building and using APIs

- [**Table Plus**](https://tableplus.com/): Modern, native, and friendly GUI tool for relational databases



# Pre Setup

- Required **Node 20** or higher

- Make sure to install the [suggested extensions](.vscode/extensions.json)


# Introduction

## Codebase structure

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


### Source code
#### libs
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

#### src
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

# Installation

- [**Install on MacOS**](docs/macos.md): on how to setup local environment on MacOS


# Run local
Navigate to the **qualgo** directory.

```bash
# copy & paste .env.local .env
cp .env.local .env
```

Please refrain from editing the MYSQL settings already present in `.env.local` to avoid potential errors.

```bash

# install required packages

yarn install

```

```bash

# init database schema

yarn db:init

```

```bash

# seed dummy data

yarn db:seed

```

```bash

# reset data and create new dummy data

yarn db:reset

# to reset data without creating new dummy data, add `--skip-seed`

yarn db:reset --skip-seed

```

```bash

# start docker in detach mode

docker compose up database -d

```


* [**Generate JWT_SECRET**](docs/jwt-secret-generating.md): on how to generate JWT_SECRET to use local
