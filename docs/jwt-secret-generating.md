# JWT_SECRET Generating

This `JWT_SECRET` is different from each local machines and only be genereted once.

Open the terminal and execute the command below

```bash
# generate jwt secret
openssl rand -hex 32
```

Copy and Paste the value into `.env` file
