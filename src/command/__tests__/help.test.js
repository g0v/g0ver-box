import Slack from '../../Slack';
import index from '../';

describe('help command', () => {
  const data = { channel: 'D100', name: 'yutin', text: 'help' };

  it('default', async () => {
    await index(data);
    expect(Slack.postMessage.mock.calls).toMatchSnapshot();
  });
});
