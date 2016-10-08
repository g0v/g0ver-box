import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'UpdateG0ver',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
  },
  mutateAndGetPayload: async () => {},
});
