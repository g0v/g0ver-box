import { ValueColumn, ArchiveColumn, DateTimeColumn } from 'graphql-tower';
import { Model } from './Database';

export default class Event extends Model {

  static tableName = 'event';

  static columns = () => ({
    user: new ValueColumn(String, 'userId'),
    title: new ValueColumn(),
    datetime: new DateTimeColumn(),
    url: new ArchiveColumn(),
  })

  whereBefore() {
    const { database } = this.constructor;
    this.where('datetime', '>', database.raw('NOW()'));
    this.orderBy('datetime');
    return this;
  }
}
