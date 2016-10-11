import _ from 'lodash';
import faker from 'faker';
import sqlparser from '../sqlparser';
import { connection } from '../../model/Database';

const data = _.mapKeys(_.uniq(faker.lorem.words(10).split(' ')), value => `${value}Key`);
const otherData = _.mapKeys(_.uniq(faker.lorem.words(10).split(' ')), value => `${value}Key`);

describe('sqlparser help', () => {
  it('mock of number', async () => {
    const table1 = faker.lorem.word();
    const table2 = faker.lorem.word();
    const sql1 = connection(table1).where(data).toSQL();
    const sql2 = connection(table2).where(otherData).toSQL();
    expect(sqlparser(sql1)).toEqual({ ...data, table: table1, method: 'select' });
    const mock = jest.fn();
    mock({}, sql1); mock({}, sql2);
    expect(sqlparser(mock)).toEqual({ ...otherData, table: table2, method: 'select' });
    expect(sqlparser(mock, 0)).toEqual({ ...data, table: table1, method: 'select' });
  });

  it('when setting omit', async () => {
    const table1 = faker.lorem.word();
    const table2 = faker.lorem.word();
    const sql1 = connection(table1).where(data).toSQL();
    const sql2 = connection(table2).where(otherData).toSQL();
    const key1 = `${_.sample(data)}Key`;
    const key2 = `${_.sample(otherData)}Key`;
    const mock = jest.fn();
    mock({}, sql1); mock({}, sql2);
    expect(sqlparser(mock, [key2])).toEqual({ ..._.set({ ...otherData }, key2, true), table: table2, method: 'select' });
    expect(sqlparser(mock, 0, [key1])).toEqual({ ..._.set({ ...data }, key1, true), table: table1, method: 'select' });
  });

  it('select', async () => {
    const limit = _.random(1, 99);
    const offset = _.random(1, 99);
    const table = faker.lorem.word();

    const sql = connection(table)
      .where(data).limit(limit).offset(offset)
      .toSQL();
    expect(sqlparser(sql)).toEqual({ ...data, limit, offset, table, method: 'select' });
  });

  it('update', async () => {
    const id = _.random(1, 99);
    const table = faker.lorem.word();
    const sql = connection(table).where({ id }).update(data).toSQL();
    expect(sqlparser(sql)).toEqual({ ...data, id, table, method: 'update' });
  });

  it('insert', async () => {
    const table = faker.lorem.word();
    const sql = connection(table).insert(data).toSQL();
    expect(sqlparser(sql)).toEqual({ ...data, table, method: 'insert' });
  });
});
