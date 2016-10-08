import { GraphQLID } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';
import { G0verConnectionType } from '../type/G0verType';
import G0ver from '../model/G0ver';

export default {
  type: G0verConnectionType,
  args: {
    id: { type: GraphQLID },
    username: { type: GraphQLID },
    ...connectionArgs,
  },
  resolve: async (payload, args) => {
    const model = new G0ver();
    if (args.id) model.where({ id: args.id });
    if (args.username) model.where({ username: args.username });

    const g0ver = await model.fetchAll();
    return connectionFromArray(g0ver.toJSON(), args);
  },
};
