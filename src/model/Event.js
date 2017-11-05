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

  static whereBefore() {
    this.query.where('datetime', '>', this.database.raw('NOW()'));
  }
}
