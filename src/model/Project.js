import { Model } from './Database';

import G0ver from './G0ver';

export default Model.extend({
  tableName: 'project',
  hasTimestamps: true,
  softDelete: true,
  project: function project() {
    return this.belongsToMany(G0ver, 'g0ver_project', 'project_id', 'g0ver_id');
  },
});
