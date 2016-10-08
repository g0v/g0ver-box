import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import G0verQuery from './query/G0verQuery';
import ProjectQuery from './query/ProjectQuery';

import UpdateG0verMutation from './mutation/UpdateG0verMutation';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    g0ver: G0verQuery,
    product: ProjectQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateG0ver: UpdateG0verMutation,
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
