import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import GraphQLPrimary from './GraphQLPrimary';

export default new GraphQLObjectType({
  name: 'G0ver',
  fields: () => ({
    id: { type: GraphQLPrimary },
    username: { type: GraphQLString },
    skills: { type: new GraphQLList(GraphQLString) },
  }),
});
