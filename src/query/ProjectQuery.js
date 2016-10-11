import { GraphQLID } from 'graphql';
import queryWithConnection from '../help/queryWithConnection';
import GraphQLProject from '../type/GraphQLProject';
import Project from '../model/Project';

const { Connection, ...G0verQuery } = queryWithConnection({
  type: GraphQLProject,
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLID },
  },
  resolve: async (payload, args) => {
    const model = new Project();
    if (args.id) model.where({ id: args.id });
    if (args.title) model.where({ title: args.title });

    const project = await model.fetchAll();
    return project.toJSON();
  },
});

export default G0verQuery;
export const ProjectConnection = Connection;
