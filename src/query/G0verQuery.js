import { GraphQLID } from 'graphql';
import queryWithConnection from '../help/queryWithConnection';
import GraphQLPrimary from '../type/GraphQLPrimary';
import GraphQLG0ver from '../type/GraphQLG0ver';
import G0ver from '../model/G0ver';
import G0verProject from '../model/G0verProject';

const { Connection, ...G0verQuery } = queryWithConnection({
  type: GraphQLG0ver,
  args: {
    id: { type: GraphQLPrimary },
    username: { type: GraphQLID },
  },
  resolve: async (payload, args) => {
    let model = new G0ver();

    if (args.id) {
      const reply = await model.where({ id: args.id }).fetch();
      return reply && [reply.toJSON()];
    }

    if (payload && payload.id) {
      model = await G0verProject
        .where({ project_id: payload.id })
        .query((qb) => {
          qb.select('g0ver.*');
          qb.leftJoin('g0ver', 'g0ver_project.g0ver_id', 'g0ver.id');
        });
    }

    const result = await model.fetchAll();
    return result.toJSON();
  },
});

export default G0verQuery;
export const G0verConnection = Connection;
