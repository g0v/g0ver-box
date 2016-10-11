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
}));

const request = ({ username, skill }) => `
  mutation {
    updateG0ver(input: { username: "${username}" ${skill ? `skill: ${JSON.stringify(skill)} ` : ''}}) {
      clientMutationId
      g0ver { username }
    }
  }
`;

describe('G0ver Mutation', () => {
  it('create a g0ver', async () => {
    const sample = _.sample(data);

    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([]));
    const result = await graphql(Schema, request(sample));
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ username: sample.username, limit: 1, table: 'g0ver', method: 'select' });
    expect(sqlparser(query, 1)).toEqual({
      username: sample.username,
      skill: JSON.stringify(sample.skill),
      created_at: true,
      updated_at: true,
      table: 'g0ver',
      method: 'insert',
    });
    const g0ver = _.get(result, 'data.updateG0ver');
    expect(g0ver).toEqual({
      clientMutationId: null,
      g0ver: { username: sample.username },
    });
  });

  it('update a g0ver', async () => {
    const sample = _.sample(data);

    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{ id: sample.id, username: sample.username }]));
    const result = await graphql(Schema, request(sample));
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ username: sample.username, limit: 1, table: 'g0ver', method: 'select' });
    expect(sqlparser(query, 1)).toEqual({
      id: sample.id,
      username: sample.username,
      skill: JSON.stringify(sample.skill),
      updated_at: true,
      table: 'g0ver',
      method: 'update',
    });
    const g0ver = _.get(result, 'data.updateG0ver');
    expect(g0ver).toEqual({
      clientMutationId: null,
      g0ver: { username: sample.username },
    });
  });

  it('noop to update any g0ver', async () => {
    const sample = _.sample(data);

    query.mockClear();
    query.mockReturnValueOnce(Promise.resolve([{ id: sample.id, username: sample.username }]));
    const result = await graphql(Schema, request({ username: sample.username }));
    expect(result.errors).toBeUndefined();
    expect(sqlparser(query, 0)).toEqual({ username: sample.username, limit: 1, table: 'g0ver', method: 'select' });
    expect(sqlparser(query, 1)).toEqual({
      id: sample.id,
      username: sample.username,
      updated_at: true,
      table: 'g0ver',
      method: 'update',
    });
    const g0ver = _.get(result, 'data.updateG0ver');
    expect(g0ver).toEqual({
      clientMutationId: null,
      g0ver: { username: sample.username },
    });
  });
});
