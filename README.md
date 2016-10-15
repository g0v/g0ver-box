# g0vhub

## Dependencies

* nodemon
* babel-node
* knex
* eslint
* jest

## Setup developing environment

We recommanded you using postgres docker as your database.

```
docker run -p 54320:5432 --name g0v-postgres -e POSTGRES_PASSWORD='' -e POSTGRES_DB='g0vhub' -d postgres
```

If you are using docker-machine please edit the configuration in `knexfile.js`.

```
host: <DOCKER_MACHINE_HOST>,
```

## Migrate DB Schema

Please run this command when database started up.

```
npm run migrate
```
