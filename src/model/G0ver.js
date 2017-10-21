import _ from 'lodash';
import { isGlobalId, fromGlobalId, toGlobalId } from 'graphql-tower';
import CacheModel, { ValueColumn } from 'cache-model';
import db from './Database';
import GraphQLG0ver from '../type/GraphQLG0ver';

export default class User extends CacheModel {

  static tableName = 'g0ver';

  static database = db;

  static columns = {
    username: new ValueColumn(),
    skills: new ValueColumn(Object),
  }

  static fromGlobalId(id) {
    return isGlobalId(id) ? fromGlobalId(id, 'G0ver') : id;
  }

  static toGlobalId(id) {
    return toGlobalId('G0ver', id);
  }

  static toKeyword({ skills }) {
    return _.toLower((skills || []).join(' '));
  }

  type = GraphQLG0ver;
}
