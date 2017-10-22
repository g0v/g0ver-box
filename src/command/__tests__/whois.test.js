import { client } from 'knex';
import Slack from '../../Slack';
import G0ver from '../../model/G0ver';
import index from '../';

describe('whois command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'whois <@U0384RCFD>' };

  it('when g0ver does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });

  it('when g0ver is existed', async () => {
    G0ver.prime('U0384RCFD');
    client.mockReturnValueOnce([{ id: 'U0384RCFD', skills: ['react', 'harmonica'] }]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });
});
