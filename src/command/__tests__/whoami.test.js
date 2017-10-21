import { client } from 'knex';
import Slack from '../../Slack';
import G0ver from '../../model/G0ver';
import index from '../';

describe('whoami command', () => {
  const data = { channel: 'D100', name: 'yutin', text: 'whoami' };

  it('when g0ver does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });

  it('when g0ver is existed', async () => {
    G0ver.prime('yutin');
    client.mockReturnValueOnce([{ id: 'yutin', skills: ['react', 'video'] }]);
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });
});