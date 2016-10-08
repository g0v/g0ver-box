import { Model } from './Database';

export default Model.extend({
  tableName: 'g0ver',
  hasTimestamps: true,
  softDelete: true,
});
