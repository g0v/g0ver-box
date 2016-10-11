import { GraphQLID } from 'graphql';
import queryWithConnection from '../help/queryWithConnection';
import GraphQLG0verType from '../type/GraphQLG0verType';
import G0ver from '../model/G0ver';

const { Connection, ...G0verQuery } = queryWithConnection({
  type: GraphQLG0verType,
  args: {
    id: { type: GraphQLID },
    username: { type: GraphQLID },
  },
  resolve: async (payload, args) => {
    const model = new G0ver();
    if (args.id) model.where({ id: args.id });
    if (args.username) model.where({ username: args.username });

    const g0ver = await model.fetchAll();
    return g0ver.toJSON();
  },
});

export default G0verQuery;
export const G0verConnection = Connection;
