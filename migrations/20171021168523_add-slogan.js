exports.up = knex => (
  knex.schema.table('g0ver', (table) => {
    table.string('slogan');
  })
);

exports.down = knex => (
  knex.schema.table('g0ver', (table) => {
    table.dropColumn('slogan');
  })
);
