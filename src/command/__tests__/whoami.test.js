import { client } from 'knex';
import Slack from '../../Slack';
import G0ver from '../../model/G0ver';
import index from '../';

describe('whoami command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'whoami' };

  it('when g0ver does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });

  it('when g0ver is existed', async () => {
    G0ver.prime('U03B2AB13');
    client.mockReturnValueOnce([{ id: 'U03B2AB13', skills: ['react', 'video'] }]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });
});
