import { client } from 'knex';
import Slack from '../../Slack';
import G0ver from '../../model/G0ver';
import index from '../';

describe('whoami command', () => {
  const data = { channel: 'D100', name: 'yutin', text: 'whoami' };

  it('when g0ver does not exist', async () => {
    client.mockReturnValueOnce([]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: '請使用 `add <skill name>` 新增你的技能' });
  });

  it('when g0ver is existed', async () => {
    G0ver.prime('yutin');
    client.mockReturnValueOnce([{ id: 'yutin', skills: ['react', 'video'] }]);
    await index(data);
    expect(client).toMatchSnapshot();
    expect(Slack.postMessage).toHaveBeenLastCalledWith({ channel: 'D100', text: 'yutin 已登錄的技能 react, video' });
  });
});
