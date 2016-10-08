import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import _ from 'lodash';

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    website: {
      type: GraphQLString,
      resolve: payload => payload.website || _.get(payload, 'detail.website'),
    },
    github: {
      type: GraphQLString,
      resolve: payload => payload.github || _.get(payload, 'detail.github'),
    },
    hackfoldr: {
      type: GraphQLString,
      resolve: payload => payload.hackfoldr || _.get(payload, 'detail.hackfoldr'),
    },
    video: {
      type: GraphQLString,
      resolve: payload => payload.video || _.get(payload, 'detail.video'),
    },
  },
});

export default ProjectType;

export const ProjectConnectionType = connectionDefinitions({
  name: 'Project',
  nodeType: ProjectType,
}).connectionType;
