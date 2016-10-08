const faker = require('faker');
const _ = require('lodash');

exports.seed = (knex, Promise) => (
  knex('g0ver').truncate()
    .then(() => (
      Promise.all(_.range(1, 100).map(() => (
        knex('g0ver').insert({
          username: faker.internet.userName(),
          skill: JSON.stringify(_.uniq(faker.lorem.words().split(' '))),
        })
      )))
    ))
);
