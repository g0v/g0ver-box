import { GraphQLID } from 'graphql';
import queryWithConnection from '../help/queryWithConnection';
import GraphQLProject from '../type/GraphQLProject';
import Project from '../model/Project';
import G0verProject from '../model/G0verProject';

const { Connection, ...G0verQuery } = queryWithConnection({
  type: GraphQLProject,
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLID },
  },
  resolve: async (payload, args) => {
    let model = new Project();

    if (args.id) {
      const reply = await model.where({ id: args.id }).fetch();
      return reply && [reply.toJSON()];
    }

    if (payload && payload.id) {
      model = await G0verProject
        .where({ g0ver_id: payload.id })
        .query((qb) => {
          qb.select('project.*');
          qb.leftJoin('project', 'g0ver_project.project_id', 'project.id');
        });
    }

    const result = await model.fetchAll();
    return result.toJSON();
  },
});

export default G0verQuery;
export const ProjectConnection = Connection;
