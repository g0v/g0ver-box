import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import _ from 'lodash';
import { connectionDefinitions } from 'graphql-relay';
import G0verType from '../type/G0verType';
import G0verProject from '../model/G0verProject';

const ProjectWithG0verType = new GraphQLObjectType({
  name: 'ProjectWithG0ver',
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
    g0ver: {
      type: new GraphQLList(G0verType),
      resolve: async (project) => {
        const g0ver = await G0verProject
        .where({ project_id: project.id })
        .query((qb) => {
          qb.select('g0ver.*');
          qb.leftJoin('g0ver', 'g0ver_project.g0ver_id', 'g0ver.id');
        })
        .fetchAll();
        return g0ver.toJSON();
      },
    },
  },
});

export default ProjectWithG0verType;

export const ProjectWithG0verConnectionType = connectionDefinitions({
  name: 'ProjectWithG0ver',
  nodeType: ProjectWithG0verType,
}).connectionType;
