import { ValueColumn, DateTimeColumn } from 'graphql-tower';
import { Model } from './Database';

export default class Task extends Model {

  static tableName = 'task';

  static columns = {
    user: new ValueColumn(String, 'userId'),
    note: new ValueColumn(),
    expiredAt: new DateTimeColumn(),
  }
}
