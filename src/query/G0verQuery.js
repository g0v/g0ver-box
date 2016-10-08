import { GraphQLID } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';
import { G0verConnectionType } from '../type/G0verType';

export default {
  type: G0verConnectionType,
  args: {
    id: { type: GraphQLID },
    ...connectionArgs,
  },
  resolve: async (payload, args) => (
    connectionFromArray([], args)
  ),
};
