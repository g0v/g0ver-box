exports.up = knex => (
  knex.schema.createTable('g0ver_project', (table) => {
    table.integer('g0ver_id');
    table.integer('project_id');
    table.primary(['g0ver_id', 'project_id']);
    table.timestamps();
  })
);

exports.down = knex => (
  knex.schema.dropTable('g0ver_project')
);
