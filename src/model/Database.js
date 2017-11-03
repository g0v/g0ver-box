import knex from 'knex';
import { Model as GraphqlModel } from 'graphql-tower';
import config from '../../knexfile';

const db = knex(config);

export default db;

export class Model extends GraphqlModel {
  static database = db;
}
