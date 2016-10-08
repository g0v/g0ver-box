exports.up = knex => (
  knex.schema.createTable('project', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    // website, github, hackfoldr, video
    table.json('detail');
    table.timestamps();
    table.dateTime('deleted_at');
  })
);

exports.down = knex => (
  knex.schema.dropTable('project')
);
