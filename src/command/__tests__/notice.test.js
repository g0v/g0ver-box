import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('notice command', () => {
  describe('notice <message>', () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'notice 即將開放報名' };

    it('when project and event does not exist', async () => {
      client.mockReturnValueOnce([]);
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 找不到可發訊息通知的專案或活動',
      });

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(2);
    });

    it('successfully notice when has event', async () => {
      client.mockReturnValueOnce([{ id: '5', title: 'g0ver box', followerIds: ['U03B2AB13', 'U03B2AB00'] }]);
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: expect.stringContaining('請選擇要發訊息通知的專案或活動（輸入代碼）？\n`（輸入 exit 可離開）`'),
      });

      await index({ ...data, text: '1' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: expect.stringContaining('請確認發送訊息通知的內容如下？（輸入 yes 立即發送）\n`（輸入 exit 可離開）`'),
      });

      await index({ ...data, text: 'yes' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
        channel: 'D100',
        text: 'Done, 發送 g0ver box 活動通知',
      }));

      expect(Slack.postMultiMessage).toHaveBeenLastCalledWith(
        ['U03B2AB13', 'U03B2AB00'],
        '即將開放報名',
      );

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(2);
    });

    it('successfully notice when has project', async () => {
      client.mockReturnValueOnce([]);
      client.mockReturnValueOnce([{ id: '5', title: 'g0ver box', followerIds: ['U03B2AB13', 'U03B2AB00'] }]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: expect.stringContaining('請選擇要發訊息通知的專案或活動（輸入代碼）？\n`（輸入 exit 可離開）`'),
      });

      await index({ ...data, text: '1' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: expect.stringContaining('請確認發送訊息通知的內容如下？（輸入 yes 立即發送）\n`（輸入 exit 可離開）`'),
      });

      await index({ ...data, text: 'yes' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
        channel: 'D100',
        text: 'Done, 發送 g0ver box 專案通知',
      }));

      expect(Slack.postMultiMessage).toHaveBeenLastCalledWith(
        ['U03B2AB13', 'U03B2AB00'],
        '即將開放報名',
      );

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(2);
    });
  });

  it('notie [message]', async () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'notice' };

    client.mockReturnValueOnce([{ id: '5', title: 'g0ver box', followerIds: ['U03B2AB13', 'U03B2AB00'] }]);
    client.mockReturnValueOnce([]);

    await index(data);
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: expect.stringContaining('請選擇要發訊息通知的專案或活動（輸入代碼）？\n`（輸入 exit 可離開）`'),
    });

    await index({ ...data, text: '1' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入發送訊息通知的內容？\n`（輸入 exit 可離開）`',
    });

    await index({ ...data, text: '系統將在週末更新' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: expect.stringContaining('請確認發送訊息通知的內容如下？（輸入 yes 立即發送）\n`（輸入 exit 可離開）`'),
    });

    await index({ ...data, text: 'yes' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
      channel: 'D100',
      text: 'Done, 發送 g0ver box 活動通知',
    }));

    expect(Slack.postMultiMessage).toHaveBeenLastCalledWith(
      ['U03B2AB13', 'U03B2AB00'],
      '系統將在週末更新',
    );

    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(2);
  });
});
