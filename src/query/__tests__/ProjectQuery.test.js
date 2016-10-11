import { graphql } from 'graphql';
import _ from 'lodash';
import faker from 'faker';
import sqlparser from '../../help/sqlparser';
import Schema from '../../Schema';
import { query } from '../../model/Database';

const data = _.range(1, 5).map(() => ({
  id: _.random(1, 999),
  title: faker.name.title(),
  description: faker.lorem.lines(),
  detail: {
    website: faker.internet.url(),
  },
  g0ver_list: _.range(1, 5).map(() => ({ id: _.random(1, 999) })),
}));

const request = id => `
  query {
    project${id ? ` (id: ${id})` : ''} {
      edges { node {
        id
        title
        description
        website
        g0ver { id }
      } }
    }
  }
`;

describe('Project Query', () => {
  it('find project', async () => {
    const g0verId = _.random(1, 999);
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve(data));
    const result = await graphql(Schema, request(), { id: g0verId }, {});
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ g0ver_id: g0verId, table: 'g0ver_project', method: 'select' });
    const edges = _.get(result, 'data.project.edges');
    _.forEach(edges, ({ node }, idx) => {
      expect(node).toEqual({
        ..._.omit(data[idx], ['g0ver_list', 'detail']),
        website: data[idx].detail.website,
        g0ver: [],
      });
    });
    expect(_.size(edges)).toBe(data.length);
  });

  it('query a project', async () => {
    const sample = _.sample(data);

    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([sample]));
    query.mockReturnValueOnce(Promise.resolve(sample.g0ver_list));
    const result = await graphql(Schema, request(sample.id), {}, {});
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ id: sample.id, limit: 1, table: 'project', method: 'select' });
    expect(sqlparser(query, 1)).toEqual({ project_id: sample.id, table: 'g0ver_project', method: 'select' });
    const edges = _.get(result, 'data.project.edges');
    expect(edges[0].node).toEqual({
      ..._.omit(sample, ['g0ver_list', 'detail']),
      website: sample.detail.website,
      g0ver: sample.g0ver_list,
    });
    expect(_.size(edges)).toBe(1);
  });

  it('query any project', async () => {
    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve(data));
    const result = await graphql(Schema, request(), {}, {});
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ table: 'project', method: 'select' });
    const edges = _.get(result, 'data.project.edges');
    _.forEach(edges, ({ node }, idx) => {
      expect(node).toEqual({
        ..._.omit(data[idx], ['g0ver_list', 'detail']),
        website: data[idx].detail.website,
        g0ver: [],
      });
    });
    expect(_.size(edges)).toBe(data.length);
  });
});
