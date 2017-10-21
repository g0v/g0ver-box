import { GraphQLID } from 'graphql';
import queryWithConnection from '../help/queryWithConnection';
import GraphQLPrimary from '../type/GraphQLPrimary';
import GraphQLG0ver from '../type/GraphQLG0ver';

const { Connection, ...G0verQuery } = queryWithConnection({
  type: GraphQLG0ver,
  args: {
    id: { type: GraphQLPrimary },
    username: { type: GraphQLID },
  },
  resolve: async () => ({}),
});

export default G0verQuery;
export const G0verConnection = Connection;
