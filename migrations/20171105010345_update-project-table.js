exports.up = knex => (
  Promise.resolve()
    .then(() => knex.schema.table('project', (table) => {
      table.string('user_id');
      table.string('tags');
      table.specificType('keyword', 'tsvector');
      table.renameColumn('detail', 'archive');
      table.dropColumn('description');
    }))
    .then(() => knex.schema.raw(
      'CREATE INDEX project_keyword_idx ON project USING GIN (keyword);'
    ))
    .then(() => knex.schema.table('task', (table) => {
      table.integer('project_id');
    }))
);

exports.down = knex => (
  Promise.resolve()
    .then(() => knex.schema.table('project', (table) => {
      table.dropColumn('user_id');
      table.dropColumn('tags');
      table.dropColumn('keyword');
      table.renameColumn('archive', 'detail');
    }))
    .then(() => knex.schema.table('task', (table) => {
      table.dropColumn('project_id');
    }))
);
