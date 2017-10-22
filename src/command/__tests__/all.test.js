import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('all command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'all' };

  it('when g0ver have been tasks', async () => {
    client.mockReturnValueOnce([
      { id: 'XYZ1', user_id: 'U03B2AB13', note: 'g0ver box' },
      { id: 'XYZ2', user_id: 'U0RQYV16K', note: 'harmonica' },
    ]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: '<@U03B2AB13> in g0ver box\n<@U0RQYV16K> in harmonica' });
  });
});
