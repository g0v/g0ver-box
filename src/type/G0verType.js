import { GraphQLID, GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

const G0verType = new GraphQLObjectType({
  name: 'G0ver',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLID },
    skill: { type: new GraphQLList(GraphQLString) },
  },
});

export default G0verType;

export const G0verConnectionType = connectionDefinitions({
  name: 'G0ver',
  nodeType: G0verType,
}).connectionType;
