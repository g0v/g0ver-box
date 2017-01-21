# g0vhub

## Dependencies

* nodemon
* babel-node
* knex
* eslint
* jest

## Yarn supported

We suggest you to use yarn to manage package.

## Setup developing environment

We recommended you using postgres docker as your database.

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
yarn migrate
```
or
```
npm run migrate
```

## Before you start

Install the dependencies through your package management tool

```
yarn && yarn start
```
or
```
npm install && npm start
```

## Test

Run all unit-tests

```
yarn test
```
or
```
npm test
```

Run the test related to files

```
yarn test-watch
```
or
```
npm test-watch
```
