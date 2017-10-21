exports.up = knex => (
  knex.schema.createTableIfNotExists('task', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
    table.string('user_id');
    table.string('note');
    table.timestamps();
    table.dateTime('deleted_at');
    table.dateTime('expired_at').unsigned().index();
  })
);

exports.down = knex => (
  knex.schema.dropTable('task')
);
