import _ from 'lodash';

export default function camelgetter(data, key) {
  const object = _.isObject(data) ? data : {};
  return _.isNil(object[key]) ? object[_.snakeCase(key)] : object[key];
}
