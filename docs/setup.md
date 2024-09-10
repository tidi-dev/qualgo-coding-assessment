
#Navigate to the **qualgo** directory.

```bash
# copy & paste .env.local .env
cp .env.example .env
```
* [**Generate JWT_SECRET**](./jwt-secret-generating.md): on how to generate JWT_SECRET to use local

```bash
# install packagas
yarn install
```

> **_NOTE:_**

> Please refrain from editing the MYSQL settings already present in `.env.local` to avoid potential errors.

> All MYSQL keys are sent via email. Please check your email for more details.

```bash
# start docker in detach mode
docker compose up --build -d
```

```bash
# seed dummy data
yarn db:init && yarn db:seed
```

```bash
# reset data and create new dummy data
yarn db:reset

# to reset data without creating new dummy data, add `--skip-seed`
yarn db:reset --skip-seed
```

# The api is ready at http://localhost:3000
