import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import ProjectType from '../type/ProjectType';
import G0verProject from '../model/G0verProject';

const G0verWithProjectType = new GraphQLObjectType({
  name: 'G0verWithProject',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLID },
    skill: { type: new GraphQLList(GraphQLString) },
    project: {
      type: new GraphQLList(ProjectType),
      resolve: async (g0ver) => {
        const project = await G0verProject
        .where({ g0ver_id: g0ver.id })
        .query((qb) => {
          qb.select('project.*');
          qb.leftJoin('project', 'g0ver_project.project_id', 'project.id');
        })
        .fetchAll();
        return project.toJSON();
      },
    },
  },
});

export default G0verWithProjectType;

export const G0verWithProjectConnectionType = connectionDefinitions({
  name: 'G0verWithProject',
  nodeType: G0verWithProjectType,
}).connectionType;
