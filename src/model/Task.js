import { ValueColumn, DateTimeColumn } from 'graphql-tower';
import { Model } from './Database';
import Project from './Project';

export default class Task extends Model {

  static tableName = 'task';

  static columns = () => ({
    user: new ValueColumn(String, 'userId'),
    project: new ValueColumn(Project, 'projectId'),
    note: new ValueColumn(),
    expiredAt: new DateTimeColumn(),
  })
}
