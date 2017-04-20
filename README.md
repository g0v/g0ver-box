# g0ver-box

A macthmaking slack-bot for g0v projects and g0v attendees.
Tell bot the skills you have or issues you like. Bot would match attendees and projects.

## How to use

- help 使用說明
- in <project name / task> <datetime> 表示正在某個坑裡，datetime 為預計何時出坑，預設 24 hr 後出坑
- out 表示已經離開某個坑
- all 查詢有哪些 g0ver 正在哪些坑
- add <skill name> 新增技能
- del <skill name> 刪除技能
- whoami 查詢自己有哪些技能
- search <skill name> 搜尋哪些 g0ver 會此技能
- whois <slack id> 查詢此 g0ver 有哪些技能

## Environment Variables

* DATABASE_URL (required)
  * default value is `postgresql://localhost:54320/g0vhub`
* SLACK_TOKEN (required)
* SLACK_BOT_ID
  * default value is `g0ver`
* PORT
  * default value is `8080`

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

### Configure database hostname

If you were using docker-machine/virtual machine please edit `host` in `knexfile.js`.

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

## Start your own g0ver

```
SLACK_TOKEN='xoxb-123456789012-xxxxxxXXXxxxXXXXXXXXXxxx' yarn start
```
or
```
SLACK_TOKEN='xoxb-123456789012-xxxxxxXXXxxxXXXXXXXXXxxx' npm start
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
