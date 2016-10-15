import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import GraphQLProject from '../type/GraphQLProject';
import Project from '../model/Project';

export default mutationWithClientMutationId({
  name: 'UpdateProjectId',
  inputFields: {
    projectId: { type: new GraphQLNonNull(GraphQLString) },
    newProjectId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    project: { type: GraphQLProject },
  },
  mutateAndGetPayload: async ({ projectId, newProjectId }) => {
    const project = await new Project().where({ projectId }).fetch();
    const newProject = await new Project().where({ newProjectId }).fetch();

    // Authetication required
    // if (newProject) {
    //   throw Error
    // }

    if (!newProject) {
      model.set('projectId', JSON.stringify(newProjectId));
      await model.save();
    }

    return { project: model.toJSON() };
  },
});