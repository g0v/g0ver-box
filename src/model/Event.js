import { ValueColumn, ArchiveColumn, DateTimeColumn, ListColumn } from 'graphql-tower';
import { Model } from './Database';

export default class Event extends Model {

  static tableName = 'event';

  static columns = () => ({
    user: new ValueColumn(String, 'userId'),
    title: new ValueColumn(),
    datetime: new DateTimeColumn(),
    url: new ArchiveColumn(),
    follower: new ListColumn(String, 'followerIds'),
  })

  whereBefore() {
    const { database } = this.constructor;
    this.where('datetime', '>', database.raw('NOW()'));
    this.orderBy('datetime');
    return this;
  }

  whereFollowed(user) {
    return this.whereRaw('follower_ids @> ?', [[user]]);
  }

  whereUnfollowed(user) {
    return this.whereRaw('follower_ids <> ?', [[user]]);
  }
}
