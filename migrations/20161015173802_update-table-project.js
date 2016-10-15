exports.up = knex => (
  knex.schema.table('project', (table) => {
    table.string('projectId').notNullable().index();
  })
);

exports.down = knex => (
  knex.schema.table('project', (table) => {
    table.dropColumn('projectId');
  })
);
