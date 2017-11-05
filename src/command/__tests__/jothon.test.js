import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('jothon command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'jothon 基礎建設松' };

  it('when event does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce(['5']);

    await index(data);
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入 RFC2822 或 ISO8601 格式的 活動時間 預設為 +08 時區 （ex. 12-31 23:00+08）？\n`（輸入 exit 可離開）`',
    });

    await index({ ...data, text: '12-31 14:00' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入 活動資訊 / 報名 連結？\n`（輸入 skip 可跳過）` `（輸入 exit 可離開）`',
    });

    await index({ ...data, text: 'https://events.g0v.tw/' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
      channel: 'D100',
      text: '請確認資料如下？（輸入 yes 完成建立）\n`（輸入 exit 可離開）`',
    }));

    await index({ ...data, text: 'yes' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: 'Done, jothon 基礎建設松',
    });

    expect(client).toMatchSnapshot();
  });

  it('when event is existed', async () => {
    client.mockReturnValueOnce([{ id: 5 }]);

    await index(data);
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: 'Sorry! 發現相同的活動名稱',
    });

    expect(client).toMatchSnapshot();
  });

  it('when use skip', async () => {
    client.mockReturnValueOnce([]);
    await index(data);
    await index({ ...data, text: '12-31 16' });
    await index({ ...data, text: 'skip' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
      channel: 'D100',
      text: '請確認資料如下？（輸入 yes 完成建立）\n`（輸入 exit 可離開）`',
    }));
    await index({ ...data, text: 'skip' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
      channel: 'D100',
      text: '無法判斷的指令',
    }));
    await index({ ...data, text: 'exit' });
  });

  describe('datetime', () => {
    beforeEach(async () => {
      client.mockReturnValueOnce([]);

      await index(data);
    });

    it('12-31 16', async () => {
      await index({ ...data, text: '12-31 16' });
      await index({ ...data, text: 'https://events.g0v.tw/' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
        attachments: expect.arrayContaining([expect.objectContaining({
          color: '#000',
          text: expect.stringContaining('1514707200000'),
        })]),
      }));
      await index({ ...data, text: 'exit' });
    });

    it('12-31 16+09', async () => {
      await index({ ...data, text: '12-31 16+09' });
      await index({ ...data, text: 'https://events.g0v.tw/' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
        attachments: expect.arrayContaining([expect.objectContaining({
          color: '#000',
          text: expect.stringContaining('1514703600000'),
        })]),
      }));
      await index({ ...data, text: 'exit' });
    });

    it('2017-12-31 16+09', async () => {
      await index({ ...data, text: '2017-12-31 16+09' });
      await index({ ...data, text: 'https://events.g0v.tw/' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith(expect.objectContaining({
        attachments: expect.arrayContaining([expect.objectContaining({
          color: '#000',
          text: expect.stringContaining('1514703600000'),
        })]),
      }));
      await index({ ...data, text: 'exit' });
    });
  });
});
