import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('out command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'out' };

  it('when g0ver no any task', async () => {
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'yutin 目前沒有入坑' });
  });

  it('when g0ver have been a task', async () => {
    client.mockReturnValueOnce([{ id: 'XYZ', note: 'g0ver box' }]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'yutin 跟大家分享 g0ver box 吧!' });
  });
});
