import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('search command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'search react' };

  it('when g0ver not find', async () => {
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: '搜尋 react 找不到 g0ver, 也許你就是這樣沒有人.' });
  });

  it('when g0ver is existed', async () => {
    client.mockReturnValueOnce([
      { id: 'U03B2AB13', skills: ['react', 'video'] },
      { id: 'U0RQYV16K', skills: ['react', 'math'] },
    ]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: '搜尋 react 找到了這些 g0ver: <@U03B2AB13>, <@U0RQYV16K>.' });
  });
});
