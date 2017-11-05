exports.up = knex => (
  Promise.resolve()
    .then(() => knex.schema.table('project', (table) => {
      table.specificType('follower_ids', 'text[]');
    }))
    .then(() => knex.schema.raw(
      'CREATE INDEX project_follower_ids_idx ON project USING GIN (follower_ids);'
    ))
    .then(() => knex.schema.table('event', (table) => {
      table.specificType('follower_ids', 'text[]');
    }))
    .then(() => knex.schema.raw(
      'CREATE INDEX event_follower_ids_idx ON project USING GIN (follower_ids);'
    ))
);

exports.down = knex => (
  Promise.resolve()
    .then(() => knex.schema.table('project', (table) => {
      table.dropColumn('follower_ids');
    }))
    .then(() => knex.schema.table('event', (table) => {
      table.dropColumn('follower_ids');
    }))
);
