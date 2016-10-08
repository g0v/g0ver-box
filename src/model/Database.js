import knex from 'knex';
import bookshelf from 'bookshelf';
import paranoia from 'bookshelf-paranoia';
import config from '../../knexfile';

export const connection = knex(config);

const database = bookshelf(connection);
database.plugin(paranoia);
export default database;

export const Model = database.Model;
