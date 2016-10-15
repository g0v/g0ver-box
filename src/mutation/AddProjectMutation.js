import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import GraphQLProject from '../type/GraphQLProject';
import Project from '../model/Project';

export default mutationWithClientMutationId({
  name: 'AddProject',
  inputFields: {
    projectId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    website: { type: GraphQLString },
    github: { type: GraphQLString },
    hackfoldr: { type: GraphQLString },
    video: { type: GraphQLString },
  },
  outputFields: {
    project: { type: GraphQLProject },
  },
  mutateAndGetPayload: async ({
      projectId,
      title,
      description,
      website = '',
      github = '',
      hackfoldr = '',
      video = '',
    }) => {
    const projectExist = await new Project().where({ projectId }).fetch();
    // if (projectExist) {
    //   throw Error;
    // }
    // TODO: Set owner
    const project = new Project({ projectId, title });
    if (description) {
      project.set('description', description);
    }
    const detail = {
      website,
      github,
      hackfoldr,
      video,
    };
    project.set('detail', JSON.stringify(detail));
    await project.save();
    return { project: project.toJSON() };
  },
});