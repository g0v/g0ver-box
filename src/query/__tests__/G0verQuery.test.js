import { graphql } from 'graphql';
import _ from 'lodash';
import faker from 'faker';
import sqlparser from '../../help/sqlparser';
import Schema from '../../Schema';
import { query } from '../../model/Database';

const data = _.range(1, 5).map(() => ({
  id: _.random(1, 999),
  username: faker.internet.userName(),
  skill: _.uniq(faker.lorem.words(5).split(' ')),
  project_list: _.range(1, 5).map(() => ({ id: _.random(1, 999) })),
}));

const request = id => `
  query {
    g0ver${id ? ` (id: ${id})` : ''} {
      edges { node {
        id
        username
        skill
        project { id }
      } }
    }
  }
`;

describe('G0ver Query', () => {
  it('find g0ver', async () => {
    const projectId = _.random(1, 999);
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve(data));
    const result = await graphql(Schema, request(), { id: projectId }, {});
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ project_id: projectId, table: 'g0ver_project', method: 'select' });
    const edges = _.get(result, 'data.g0ver.edges');
    _.forEach(edges, ({ node }, idx) => {
      expect(node).toEqual({
        ..._.omit(data[idx], 'project_list'),
        project: [],
      });
    });
    expect(_.size(edges)).toBe(data.length);
  });

  it('query a g0ver', async () => {
    const sample = _.sample(data);

    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([sample]));
    query.mockReturnValueOnce(Promise.resolve(sample.project_list));
    const result = await graphql(Schema, request(sample.id), {}, {});
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ id: sample.id, limit: 1, table: 'g0ver', method: 'select' });
    expect(sqlparser(query, 1)).toEqual({ g0ver_id: sample.id, table: 'g0ver_project', method: 'select' });
    const edges = _.get(result, 'data.g0ver.edges');
    expect(edges[0].node).toEqual({
      ..._.omit(sample, ['project_list']),
      project: sample.project_list,
    });
    expect(_.size(edges)).toBe(1);
  });

  it('query any g0ver', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve(data));
    const result = await graphql(Schema, request());
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ table: 'g0ver', method: 'select' });
    const edges = _.get(result, 'data.g0ver.edges');
    _.forEach(edges, ({ node }, idx) => {
      expect(node).toEqual({
        ..._.omit(data[idx], 'project_list'),
        project: [],
      });
    });
    expect(_.size(edges)).toBe(data.length);
  });
});
