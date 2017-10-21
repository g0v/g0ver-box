import { isGlobalId, fromGlobalId, toGlobalId } from 'graphql-tower';
import CacheModel, { ValueColumn, DateTimeColumn } from 'cache-model';
import db from './Database';

export default class User extends CacheModel {

  static tableName = 'task';

  static database = db;

  static columns = {
    user: new ValueColumn(String, 'userId'),
    note: new ValueColumn(),
    expiredAt: new DateTimeColumn(),
  }

  static fromGlobalId(id) {
    return isGlobalId(id) ? fromGlobalId(id, 'Task') : id;
  }

  static toGlobalId(id) {
    return toGlobalId('Task', id);
  }
}
