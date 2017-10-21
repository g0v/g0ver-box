import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('all command', () => {
  const data = { channel: 'D100', name: 'yutin', text: 'all' };

  it('when g0ver have been tasks', async () => {
    client.mockReturnValueOnce([
      { id: 'XYZ1', user_id: 'yutin', note: 'g0ver box' },
      { id: 'XYZ2', user_id: 'pm5', note: 'harmonica' },
    ]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'yutin in g0ver box\npm5 in harmonica' });
  });
});
