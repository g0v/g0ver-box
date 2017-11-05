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
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'events' };

  it('successful query', async () => {
    client.mockReturnValueOnce([{
      id: 10,
      title: '基礎建設松',
      userId: 'U03B2AB13',
      datetime: '2017-11-05T06:00:00',
      archive: {
        url: 'https://g0v.tw/',
      },
    }, {
      id: 15,
      title: '新聞新聞松',
      userId: 'U03B2AB00',
      datetime: '2017-12-10T14:30:00',
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

    it('jothon event', async () => {
      await index({ ...data, text: 'jothon 基礎建設松' });
      await index({ ...data, text: '12-31 23:00' });
      await index({ ...data, text: 'https://events.g0v.tw/' });
      await index({ ...data, text: 'yes' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, jothon 基礎建設松',
      });
    });

    it('events', async () => {
      await index(data);
      expect(Slack.postMessage.mock.calls).toMatchSnapshot();
    });

    it('cancel event', async () => {
      await index({ ...data, text: 'cancel 基礎建設松' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, 取消 基礎建設松 活動',
      });
    });
  });
});
