import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import GraphQLJsonField from './GraphQLJsonField';

export default new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    website: new GraphQLJsonField(GraphQLString),
    github: new GraphQLJsonField(GraphQLString),
    hackfoldr: new GraphQLJsonField(GraphQLString),
    video: new GraphQLJsonField(GraphQLString),
  }),
});
