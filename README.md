### Running project

Docker is required to be installed.

To run the project:

```bash
docker network create apollo-security-example
docker-compose up
```

Note: If containers need to be rebuilt, before running compose run:

```bash
docker-compose build
```

The applications run on the following URLs:

- GraphQL: localhost:81/graphql