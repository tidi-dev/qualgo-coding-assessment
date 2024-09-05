# Qualgo API

This is the Back End

## Stacks

- Typescript [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

- Docker [https://docs.docker.com/](https://docs.docker.com/)

- NestJS framework [https://docs.nestjs.com/](https://docs.nestjs.com/)

  - class-validator [https://docs.nestjs.com/techniques/validation](https://docs.nestjs.com/techniques/validation)

  - class-transformer [https://docs.nestjs.com/techniques/serialization](https://docs.nestjs.com/techniques/serialization)

- Prisma (mysql) [https://www.prisma.io/docs](https://www.prisma.io/docs)

- Swagger [https://docs.nestjs.com/openapi/introduction](https://docs.nestjs.com/openapi/introduction)

## Pre Setup

- Required **Node 20** or higher

- **Tools** are recommended

  - [**Visual Studio Code**](https://code.visualstudio.com/): Completely free and with built-in Git support and huge extension library, it’s widely used, especially by frontend developers.

  - [**Postman**](https://www.postman.com/): API platform for building and using APIs

  - [**Table Plus**](https://tableplus.com/): Modern, native, and friendly GUI tool for relational databases

- Make sure to install the [suggested extensions](.vscode/extensions.json)

## Structure

```
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── common
│   ├── constants
│   │   ├── index.ts
│   │   └── regex.constant.ts
│   ├── dtos
│   │   ├── create-inventory.dto.ts
│   │   └── index.ts
│   ├── repositories
│   │   ├── base.repository.ts
│   │   ├── configuration.repository.ts
│   │   ├── index.ts
│   │   ├── inventory.repository.ts
│   │   └── product-variant.repository.ts
│   └── responses
│       ├── create-inventory.response.ts
│       └── index.ts
├── config
│   └── swagger.config.ts
├── core
│   └── validators
│       ├── index.ts
│       ├── is-existing-configuration.validator.ts
│       ├── is-existing-id.validator.ts
│       └── is-unique-imei.validator.ts
├── database
│   ├── migrations
│   │   ├── 20240224114443_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   ├── seed.ts
│   └── seeders
│       └── dummy.data.ts
├── inventory
│   ├── inventory.controller.spec.ts
│   ├── inventory.controller.ts
│   ├── inventory.module.ts
│   ├── inventory.service.spec.ts
│   └── inventory.service.ts
├── main.ts
└── prisma
    ├── prisma.module.ts
    └── prisma.service.ts

15 directories, 33 files
```

The project organizes its main folders within `/src`, encompassing essential directories such as `common`, `core`, `config`, `database`, and `prisma`.

Additionally, it incorporates several model-related folders, including `inventory`.

## Setup

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

## API

```bash
Endpoint: POST localhost:3001/inventory
Payload:
{
    "product_model_id": "786497e7-f560-41e3-9e09-f106d563af42", // replace with real id from database
    "price": 123,
    "imei": "59-266528-296802-8",
    "configuration": {
        "ram": 32,
        "color": "Black",
        "storage_capacity": "512",
        "os_version": "iOS 16"
    },
    "quantity": 10
}
```


* [**Generate JWT_SECRET**](docs/jwt-secret-generating.md): on how to generate JWT_SECRET to use local
