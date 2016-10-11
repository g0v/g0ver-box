import _ from 'lodash';
import faker from 'faker';
import { GraphQLID } from 'graphql';
import GraphQLJsonField from '../GraphQLJsonField';

describe('GraphQLJsonField Type', () => {
  it('constructor', async () => {
    const field1 = new GraphQLJsonField(GraphQLID);
    expect(field1.type).toBe(GraphQLID);
    expect(field1.field).toBe('detail');
    const fieldName = faker.lorem.word();
    const field2 = new GraphQLJsonField({ type: GraphQLID, field: fieldName });
    expect(field2.type).toBe(GraphQLID);
    expect(field2.field).toBe(fieldName);

    expect(() => new GraphQLJsonField()).toThrowError(
      'Can only create json field of a GraphQLType but got: undefined.'
    );
  });

  it('resolve', async () => {
    const snake = `${faker.lorem.word()}_${faker.lorem.word()}`;
    const camel = _.camelCase(snake);
    const object = faker.helpers.userCard();
    const value = JSON.stringify(object);
    const key = _.sample(_.keys(object));

    const field1 = new GraphQLJsonField({
      type: GraphQLID,
      field: camel,
    });
    expect(field1.resolve(
      _.set({}, camel, object), {}, {}, { fieldName: key }
    )).toEqual(object[key]);
    expect(field1.resolve(
      _.set({}, snake, value), {}, {}, { fieldName: key }
    )).toEqual(object[key]);

    const field2 = new GraphQLJsonField(GraphQLID);
    expect(field2.resolve(_.set({}, camel, object), {}, {}, { fieldName: key })).toBeNull();
  });
});
