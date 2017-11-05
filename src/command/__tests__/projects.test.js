/* eslint import/imports-first: 0 */

jest.mock('../../../knexfile', () => ({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: null,
    database: 'g0ver_projects',
  },
}));

import { client } from 'knex';
import Slack from '../../Slack';
import db from '../../model/Database';
import index from '../';

describe('projects command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'projects' };

  it('successful query', async () => {
    client.mockReturnValueOnce([{
      id: 10,
      title: 'g0ver box',
      userId: 'U03B2AB13',
      archive: {
        tags: '媒合 挖坑 推坑',
        url: 'https://g0v.tw/',
        thumb: 'https://g0v.tw/thumb.gif',
      },
    }, {
      id: 15,
      title: 'g0v today',
      userId: 'U03B2AB00',
      archive: {
        url: 'https://g0v.tw/',
      },
    }]);

    await index(data);
    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(1);
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });

  describe('database', () => {
    beforeAll(async () => {
      await db('pg_tables').select('tablename').where('schemaname', 'public').map(({ tablename }) => (
        db.schema.dropTable(tablename)
      ));
      await db.migrate.latest();
    });

    afterAll(async () => {
      await db.destroy();
    });

    it('create project', async () => {
      await index({ ...data, text: 'create g0ver-box' });
      await index({ ...data, text: 'https://project.g0v.tw/' });
      await index({ ...data, text: '找人 找坑' });
      await index({ ...data, text: 'https://project.g0v.tw/index.png' });
      await index({ ...data, text: 'yes' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, create g0ver-box',
      });
    });

    it('projects', async () => {
      await index(data);
      expect(Slack.postMessage.mock.calls).toMatchSnapshot();
    });

    it('remove projects', async () => {
      await index({ ...data, text: 'remove g0ver-box' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, 刪除 g0ver-box 專案',
      });
    });
  });
});
