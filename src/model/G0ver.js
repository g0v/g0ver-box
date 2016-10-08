import { Model } from './Database';

import Project from './Project';

export default Model.extend({
  tableName: 'g0ver',
  hasTimestamps: true,
  softDelete: true,
  project: function project() {
    return this.belongsToMany(Project, 'g0ver_project', 'g0ver_id', 'project_id');
  },
});
