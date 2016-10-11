import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import GraphQLG0ver from '../type/GraphQLG0ver';
import G0ver from '../model/G0ver';

export default mutationWithClientMutationId({
  name: 'UpdateG0ver',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    skill: { type: new GraphQLList(GraphQLString) },
  },
  outputFields: {
    g0ver: { type: GraphQLG0ver },
  },
  mutateAndGetPayload: async ({ username, skill }) => {
    const g0ver = await new G0ver().where({ username }).fetch();
    const model = g0ver || new G0ver({ username });

    if (skill) model.set('skill', JSON.stringify(skill));
    await model.save();

    return { g0ver: model.toJSON() };
  },
});
