import { GraphQLID, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import ProjectQuery from '../query/ProjectQuery';

export default new GraphQLObjectType({
  name: 'G0ver',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLID },
    skill: { type: new GraphQLList(GraphQLString) },
    project: ProjectQuery,
  }),
});
