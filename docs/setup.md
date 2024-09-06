
#Navigate to the **qualgo** directory.

```bash
# copy & paste .env.local .env
cp .env.local .env
```

Please refrain from editing the MYSQL settings already present in `.env.local` to avoid potential errors.
All MYSQL keys are sent via email. Please check your email for more details.

```bash

# start docker in detach mode

docker compose up -d

# The api is ready at http://localhost:3000
```

* [**Generate JWT_SECRET**](./jwt-secret-generating.md): on how to generate JWT_SECRET to use local
