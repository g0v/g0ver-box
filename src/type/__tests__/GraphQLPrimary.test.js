import _ from 'lodash';
import faker from 'faker';
import { Kind } from 'graphql';
import GraphQLPrimary from '../GraphQLPrimary';

const primary = _.random(1, 999);

describe('GraphQLPrimary Type', () => {
  it('serialize', async () => {
    expect(GraphQLPrimary.serialize(primary)).toBe(primary);
    expect(GraphQLPrimary.serialize(`${primary}`)).toBe(primary);
  });

  it('parseValue', async () => {
    expect(GraphQLPrimary.parseValue(primary)).toBe(primary);
    expect(GraphQLPrimary.parseValue(`${primary}`)).toBe(primary);
  });

  it('parseLiteral', async () => {
    expect(GraphQLPrimary.parseLiteral({
      kind: Kind.STRING,
      value: `${primary}`,
      loc: { start: 0, end: 10 },
    })).toBe(primary);

    expect(GraphQLPrimary.parseLiteral({
      kind: Kind.INT,
      value: primary,
      loc: { start: 0, end: 10 },
    })).toBe(primary);

    const kind = faker.random.objectElement(_.omit(Kind, ['STRING', 'INT']));
    expect(() => GraphQLPrimary.parseLiteral({
      kind,
      value: `${primary}`,
      loc: { start: 0, end: 10 },
    })).toThrowError(`Can only parse string or int got a: ${kind}`);

    expect(() => GraphQLPrimary.parseLiteral({
      kind: Kind.STRING,
      value: faker.lorem.word(),
      loc: { start: 0, end: 10 },
    })).toThrowError('Not a valid PrimaryType');
  });
});
