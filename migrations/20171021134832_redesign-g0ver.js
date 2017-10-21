exports.up = knex => (
  Promise.resolve()
    .then(() => knex.schema.dropTable('g0ver'))
    .then(() => knex.schema.createTable('g0ver', (table) => {
      table.string('id').primary();
      table.specificType('skills', 'text[]');
      table.specificType('keyword', 'tsvector');
      table.timestamps();
      table.dateTime('deleted_at');
    }))
    .then(() => (
      knex.schema.raw('CREATE INDEX g0ver_keyword_idx ON g0ver USING GIN (keyword);')
    ))
);

exports.down = knex => (
  Promise.resolve()
    .then(() => knex.schema.dropTable('g0ver'))
    .then(() => knex.schema.createTable('g0ver', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().index();
      table.json('skill');
      table.timestamps();
      table.dateTime('deleted_at');
    }))
);
