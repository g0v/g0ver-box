/* eslint no-param-reassign: ["error", { "props": false }] */

import { isType } from 'graphql';
import _ from 'lodash';
import camelgetter from '../help/camelgetter';

export default class GraphQLJsonType {

  type = null;

  field = null;

  constructor(config) {
    this.type = _.get(config, 'type', config);
    this.field = _.get(config, 'field', 'detail');
    if (!isType(this.type)) {
      throw new Error(`Can only create json field of a GraphQLType but got: ${String(this.type)}.`);
    }
  }

  resolve = (payload, args, context, { fieldName }) => {
    const field = this.field;
    payload[field] = camelgetter(payload, field) || {};

    if (_.isString(payload[field])) {
      payload[field] = JSON.parse(payload[field]);
    }

    return payload[field][fieldName] || null;
  }

}
