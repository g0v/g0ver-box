import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('cancel command', () => {
  describe('cancel <name>', () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'cancel 基礎建設松' };

    it('when event does not exist', async () => {
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 找不到活動',
      });

      expect(client).toHaveBeenCalledTimes(1);
      expect(client).toMatchSnapshot();
    });

    it('permission denied', async () => {
      client.mockReturnValueOnce([{ id: '5', userId: 'U03B2AB00' }]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 沒有權限取消 基礎建設松 活動',
      });

      expect(client).toHaveBeenCalledTimes(1);
      expect(client).toMatchSnapshot();
    });

    it('successfully deleted', async () => {
      client.mockReturnValueOnce([{ id: '5', userId: 'U03B2AB13' }]);
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, 取消 基礎建設松 活動',
      });

      expect(client).toHaveBeenCalledTimes(2);
      expect(client).toMatchSnapshot();
    });
  });

  describe('remove [name]', () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'cancel' };

    it('when event does not exist', async () => {
      client.mockReturnValueOnce([]);

      await index(data);

      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 找不到活動，快來揪松吧',
      });

      expect(client).toHaveBeenCalledTimes(1);
      expect(client).toMatchSnapshot();
    });

    describe('when event is existed', () => {
      beforeEach(async () => {
        client.mockReturnValueOnce([
          { id: '3', title: '基礎建設松' },
          { id: '5', title: 'event 0001' },
          { id: '6', title: 'event 0002' },
          { id: '9', title: 'event 0003' },
        ]);

        await index(data);
      });

      it('when not found event', async () => {
        await index({ ...data, text: '0' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: 'Sorry! 找不到活動',
        });

        expect(client).toHaveBeenCalledTimes(1);
        expect(client).toMatchSnapshot();
      });

      it('successfully deleted', async () => {
        client.mockReturnValueOnce([]);

        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: expect.stringContaining('請選擇要取消的活動（輸入代碼）？'),
        });

        await index({ ...data, text: '1' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: 'Done, 取消 基礎建設松 活動',
        });

        expect(client).toHaveBeenCalledTimes(2);
        expect(client).toMatchSnapshot();
      });
    });
  });
});
