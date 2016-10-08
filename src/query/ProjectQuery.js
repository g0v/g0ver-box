import { GraphQLID } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';
import { ProjectWithG0verConnectionType } from '../type/ProjectWithG0verType';
import Project from '../model/Project';

export default {
  type: ProjectWithG0verConnectionType,
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLID },
    ...connectionArgs,
  },
  resolve: async (payload, args) => {
    const model = new Project();
    if (args.id) model.where({ id: args.id });
    if (args.title) model.where({ title: args.title });

    const project = await model.fetchAll();
    return connectionFromArray(project.toJSON(), args);
  },
};
