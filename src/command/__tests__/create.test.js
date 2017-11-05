import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('create command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'create g0ver-box' };

  it('when project does not exist', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce(['5']);

    await index(data);
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入 共筆 / 討論 / 專業 連結？\n`（輸入 skip 可跳過）`',
    });

    await index({ ...data, text: 'https://project.g0v.tw/' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入專案的 關鍵字 ，多個關鍵字請用空白分隔 ？\n`（輸入 skip 可跳過）`',
    });

    await index({ ...data, text: '找人 找坑' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入專案的縮圖網址？支援 GIF, JPEG, PNG 格式的 75px X 75px\n`（輸入 skip 可跳過）`',
    });

    await index({ ...data, text: 'https://project.g0v.tw/index.png' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: 'Done, create g0ver-box',
    });

    expect(client).toMatchSnapshot();
  });

  it('when project is existed', async () => {
    client.mockReturnValueOnce([{ id: 5 }]);

    await index(data);
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: 'Sorry! 發現相同的專案名稱',
    });

    expect(client).toMatchSnapshot();
  });

  it('when use skip', async () => {
    client.mockReturnValueOnce([]);
    client.mockReturnValueOnce(['5']);

    await index(data);
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入 共筆 / 討論 / 專業 連結？\n`（輸入 skip 可跳過）`',
    });

    await index({ ...data, text: 'skip' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入專案的 關鍵字 ，多個關鍵字請用空白分隔 ？\n`（輸入 skip 可跳過）`',
    });

    await index({ ...data, text: 'skip' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: '請輸入專案的縮圖網址？支援 GIF, JPEG, PNG 格式的 75px X 75px\n`（輸入 skip 可跳過）`',
    });

    await index({ ...data, text: 'skip' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100',
      text: 'Done, create g0ver-box',
    });

    expect(client).toMatchSnapshot();
  });
});
