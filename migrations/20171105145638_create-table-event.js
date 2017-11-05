exports.up = knex => (
  knex.schema.createTable('event', (table) => {
    table.increments('id').primary();
    table.dateTime('datetime').index();
    table.string('user_id').notNullable().index();
    table.string('title');
    table.jsonb('archive');
    table.timestamps();
    table.dateTime('deleted_at');
  })
);

exports.down = knex => (
  knex.schema.dropTable('event')
);
