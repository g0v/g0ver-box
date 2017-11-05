import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('follow command', () => {
  describe('follow <title>', () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'follow g0ver box' };

    it('when project and event does not exist', async () => {
      client.mockReturnValueOnce([]);
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 找不到專案或活動',
      });

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(2);
    });

    it('successfully follow when has event', async () => {
      client.mockReturnValueOnce([{ id: '5', title: 'g0ver box' }]);
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, 追蹤 g0ver box 活動',
      });

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(2);
    });

    it('successfully follow when has project', async () => {
      client.mockReturnValueOnce([]);
      client.mockReturnValueOnce([{ id: '5', title: 'g0ver box' }]);
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, 追蹤 g0ver box 專案',
      });

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(3);
    });
  });

  describe('follow [title]', () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'follow' };

    it('when project and event does not exist', async () => {
      client.mockReturnValueOnce([]);
      client.mockReturnValueOnce([]);

      await index(data);

      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 找不到未追蹤的專案或活動',
      });

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(2);
    });

    describe('when project or event is existed', () => {
      beforeEach(async () => {
        client.mockReturnValueOnce([{ id: '5', title: 'project title' }]);
        client.mockReturnValueOnce([{ id: '5', title: 'event title' }]);

        await index(data);
      });

      it('successfully follow project', async () => {
        client.mockReturnValueOnce([]);
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: expect.stringContaining('請選擇要追蹤的專案或活動（輸入代碼）？\n`（輸入 exit 可離開）`'),
        });

        await index({ ...data, text: '1' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: expect.stringContaining('Done, 追蹤 project title 活動'),
        });

        expect(client).toMatchSnapshot();
        expect(client).toHaveBeenCalledTimes(3);
      });

      it('successfully follow events', async () => {
        client.mockReturnValueOnce([]);
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: expect.stringContaining('請選擇要追蹤的專案或活動（輸入代碼）？\n`（輸入 exit 可離開）`'),
        });

        await index({ ...data, text: '2' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: expect.stringContaining('Done, 追蹤 event title 專案'),
        });

        expect(client).toMatchSnapshot();
        expect(client).toHaveBeenCalledTimes(3);
      });
    });
  });
});
