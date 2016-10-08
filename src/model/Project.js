import { Model } from './Database';

export default Model.extend({
  tableName: 'project',
  hasTimestamps: true,
  softDelete: true,
});
