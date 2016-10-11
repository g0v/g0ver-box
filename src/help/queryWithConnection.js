import { GraphQLList } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromArray } from 'graphql-relay';

export default function queryWithConnection(config) {
  const { connectionType } = connectionDefinitions({
    name: config.type.name,
    nodeType: config.type,
  });

  return {
    ...config,
    type: new GraphQLList(config.type),
    Connection: {
      ...config,
      type: connectionType,
      args: { ...config.args, ...connectionArgs },
      resolve: async function resolve(...args) {
        const result = await config.resolve(...args);
        return connectionFromArray(result, args[1]);
      },
    },
  };
}
