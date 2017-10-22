import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('add command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'add react' };

  it('when g0ver does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce(['U03B2AB13']);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'done it, add react.' });
  });

  it('when g0ver is existed', async () => {
    client.mockReturnValueOnce([]);
    await index({ ...data, text: 'add video' });
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'done it, add video.' });
  });

  it('when g0ver skill is existed', async () => {
    client.mockReturnValueOnce([]);
    await index({ ...data, text: 'add video, rails' });
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'done it, add video, rails.' });
  });
});
