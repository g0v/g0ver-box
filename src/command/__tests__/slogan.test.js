import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('add command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'slogan are you freestyle' };

  it('when g0ver does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce(['U03B2AB13']);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'done it, setting are you freestyle.' });
  });

  it('when g0ver is existed', async () => {
    client.mockReturnValueOnce([{ id: 'U03B2AB13' }]);
    client.mockReturnValueOnce([]);
    await index({ ...data, text: 'slogan 你就是沒有人' });
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'done it, setting 你就是沒有人.' });
  });
});
