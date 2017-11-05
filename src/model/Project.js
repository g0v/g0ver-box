import _ from 'lodash';
import { ValueColumn, ArchiveColumn, ListColumn } from 'graphql-tower';
import { Model } from './Database';

export default class Project extends Model {

  static tableName = 'project';

  static columns = () => ({
    user: new ValueColumn(String, 'userId'),
    title: new ValueColumn(),
    tags: new ArchiveColumn(),
    url: new ArchiveColumn(),
    thumb: new ArchiveColumn(),
    follower: new ListColumn(String, 'followerIds'),
  })

  static toKeyword({ archive }) {
    return _.toLower(archive && archive.tags);
  }

  whereFollowed(user) {
    return this.whereRaw('follower_ids @> ?', [[user]]);
  }

  whereUnfollowed(user) {
    return this.whereRaw('follower_ids <> ?', [[user]]);
  }
}
