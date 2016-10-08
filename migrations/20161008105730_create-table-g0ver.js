
exports.up = knex => (
  knex.schema.createTable('g0ver', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().index();
    table.json('skill');
    table.timestamps();
    table.dateTime('deleted_at');
  })
);

exports.down = knex => (
  knex.schema.dropTable('g0ver')
);
