
## Description

Backend for technical interview

## Prerequesites

node, docker and mongodb installed

## Compile and run the project
```bash
$ docker compose -f 'docker-compose.yml' up -d --build
```

and
```bash
$ yarn start
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```