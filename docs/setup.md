
#Navigate to the **qualgo** directory.

```bash
# copy & paste .env.local .env
cp .env.local .env
```

Please refrain from editing the MYSQL settings already present in `.env.local` to avoid potential errors.
All MYSQL keys are sent via email. Please check your email for more details.

```bash

# Seeding data
```bash
# generate Prisma Client
yarn prisma generate
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

# start docker in detach mode
```bash
# start database
docker compose up -d

# start api
yarn start:dev

# The api is ready at http://localhost:3000
```

* [**Generate JWT_SECRET**](./jwt-secret-generating.md): on how to generate JWT_SECRET to use local
