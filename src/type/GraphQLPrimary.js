import { Kind, GraphQLScalarType, GraphQLError } from 'graphql';
import _ from 'lodash';

export default new GraphQLScalarType({
  name: 'Primary',
  serialize: value => _.parseInt(value),
  parseValue: value => _.parseInt(value),
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT) {
      throw new GraphQLError(`Can only parse string or int got a: ${ast.kind}`, [ast]);
    }

    const value = _.parseInt(ast.value);
    if (_.isNaN(value) || value < 1) {
      throw new GraphQLError('Not a valid PrimaryType', [ast]);
    }

    return value;
  },
});
