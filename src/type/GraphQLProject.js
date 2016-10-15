import { GraphQLObjectType, GraphQLString } from 'graphql';
import GraphQLJsonField from './GraphQLJsonField';
import GraphQLPrimary from './GraphQLPrimary';
import G0verQuery from '../query/G0verQuery';

export default new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLPrimary },
    projectId: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    website: new GraphQLJsonField(GraphQLString),
    github: new GraphQLJsonField(GraphQLString),
    hackfoldr: new GraphQLJsonField(GraphQLString),
    video: new GraphQLJsonField(GraphQLString),
    g0ver: G0verQuery,
  }),
});
