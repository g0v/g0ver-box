import _ from 'lodash';
import { ValueColumn, ArchiveColumn } from 'graphql-tower';
import { Model } from './Database';

export default class Project extends Model {

  static tableName = 'project';

  static columns = () => ({
    user: new ValueColumn(String, 'userId'),
    title: new ValueColumn(),
    tags: new ArchiveColumn(),
    url: new ArchiveColumn(),
    thumb: new ArchiveColumn(),
  })

  static toKeyword({ archive }) {
    return _.toLower(archive && archive.tags);
  }
}
