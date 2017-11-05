import _ from 'lodash';
import { ValueColumn, ListColumn } from 'graphql-tower';
import { Model } from './Database';
import GraphQLG0ver from '../type/GraphQLG0ver';

export default class G0ver extends Model {

  static tableName = 'g0ver';

  static columns = () => ({
    username: new ValueColumn(),
    skills: new ListColumn(),
    slogan: new ValueColumn(),
  })

  static toKeyword({ skills }) {
    return _.toLower((skills || []).join(' '));
  }

  type = GraphQLG0ver;
}
