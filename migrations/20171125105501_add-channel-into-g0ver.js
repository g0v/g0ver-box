exports.up = knex => knex.schema.table('g0ver', (table) => {
  table.string('channel');
});

exports.down = knex => knex.schema.table('event', (table) => {
  table.dropColumn('channel');
});
