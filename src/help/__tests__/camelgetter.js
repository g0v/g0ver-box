import _ from 'lodash';
import faker from 'faker';
import camelgetter from '../camelgetter';

describe('camelgetter help', () => {
  it('when name is snakeCase', async () => {
    const key = _.camelCase(`${faker.lorem.word()}_${faker.lorem.word()}`);
    const value = _.random(1, 9999);
    expect(camelgetter(_.set({}, _.snakeCase(key), value), key)).toBe(value);
  });

  it('when name is camelCase', async () => {
    const key = _.camelCase(`${faker.lorem.word()}_${faker.lorem.word()}`);
    const value = _.random(1, 9999);
    expect(camelgetter(_.set({}, key, value), key)).toBe(value);
  });

  it('when value is undefined', async () => {
    const key = _.camelCase(`${faker.lorem.word()}_${faker.lorem.word()}`);
    expect(camelgetter({}, key)).toBeUndefined();
  });

  it('when data is undefined', async () => {
    const key = _.camelCase(`${faker.lorem.word()}_${faker.lorem.word()}`);
    expect(camelgetter(null, key)).toBeUndefined();
  });
});
