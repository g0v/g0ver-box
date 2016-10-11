import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import ProjectQuery from '../query/ProjectQuery';
import GraphQLPrimary from './GraphQLPrimary';

export default new GraphQLObjectType({
  name: 'G0ver',
  fields: () => ({
    id: { type: GraphQLPrimary },
    username: { type: GraphQLString },
    skill: { type: new GraphQLList(GraphQLString) },
    project: ProjectQuery,
  }),
});
