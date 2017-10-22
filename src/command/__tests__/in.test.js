import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('in command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'in g0ver box' };

  it('when g0ver no any task', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'yutin 填 g0ver box 坑大吉' });
  });

  it('when g0ver have setting expired', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce([]);
    await index({ ...data, text: 'in g0ver box 48' });
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'yutin 填 g0ver box 坑大吉' });
  });
});
