import { GraphQLID, GraphQLObjectType } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

const MemberType = new GraphQLObjectType({
  name: 'G0ver',
  fields: {
    username: { type: GraphQLID },
  },
});

export default MemberType;

export const G0verConnectionType = connectionDefinitions({
  name: 'User',
  nodeType: MemberType,
}).connectionType;
