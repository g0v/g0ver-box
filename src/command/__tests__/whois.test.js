import { client } from 'knex';
import Slack from '../../Slack';
import G0ver from '../../model/G0ver';
import index from '../';

describe('whois command', () => {
  const data = { channel: 'D100', name: 'yutin', text: 'whois pm5' };

  it('when g0ver does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });

  it('when g0ver is existed', async () => {
    G0ver.prime('pm5');
    client.mockReturnValueOnce([{ id: 'pm5', skills: ['react', 'harmonica'] }]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });
});
