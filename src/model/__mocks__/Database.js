import knex from 'knex';
import bookshelf from 'bookshelf';
import paranoia from 'bookshelf-paranoia';

export const query = jest.fn(() => Promise.resolve([]));

const client = class extends knex.Client {
  _query = query;

  acquireConnection = () => {
    const completed = {
      timeout: async() => (completed),
    };
    const abort = () => {};
    const then = (cb) => {
      cb({ timeout: async() => (completed) });
    };

    return { completed, abort, then };
  }

  processResponse = resp => resp;

  releaseConnection = async() => {}
};

export const connection = knex({
  client,
});

const database = bookshelf(connection);
database.plugin(paranoia);
export default database;

export const Model = database.Model;
