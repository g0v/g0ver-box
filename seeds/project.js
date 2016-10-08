const faker = require('faker');
const _ = require('lodash');

exports.seed = (knex, Promise) => (
  knex('g0ver').truncate()
    .then(() => (
      Promise.all(_.range(1, 100).map(() => (
        knex('project').insert({
          title: faker.hacker.adjective(),
          description: faker.lorem.lines(),
          detail: JSON.stringify({
            website: faker.internet.url(),
            github: faker.internet.url(),
            hackfoldr: faker.internet.url(),
            video: faker.internet.url(),
          }),
        })
      )))
    ))
);
