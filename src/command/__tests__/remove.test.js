import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('remove command', () => {
  describe('remove <title>', () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'remove g0ver box' };

    it('when project does not exist', async () => {
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 找不到專案',
      });

      expect(client).toHaveBeenCalledTimes(1);
      expect(client).toMatchSnapshot();
    });

    it('permission denied', async () => {
      client.mockReturnValueOnce([{ id: '5', userId: 'U03B2AB00' }]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 沒有權限刪除 g0ver box 專案',
      });

      expect(client).toHaveBeenCalledTimes(1);
      expect(client).toMatchSnapshot();
    });

    it('successfully deleted', async () => {
      client.mockReturnValueOnce([{ id: '5', userId: 'U03B2AB13' }]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Done, 刪除 g0ver box 專案',
      });

      expect(client).toHaveBeenCalledTimes(2);
      expect(client).toMatchSnapshot();
    });
  });

  describe('remove [title]', () => {
    const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'remove' };

    it('when project does not exist', async () => {
      client.mockReturnValueOnce([]);

      await index(data);

      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100',
        text: 'Sorry! 找不到坑，快來挖坑吧',
      });

      expect(client).toHaveBeenCalledTimes(1);
      expect(client).toMatchSnapshot();
    });

    describe('when project is existed', () => {
      beforeEach(async () => {
        client.mockReturnValueOnce([
          { id: '3', title: 'g0ver box' },
          { id: '5', title: 'project 0001' },
          { id: '6', title: 'project 0002' },
          { id: '9', title: 'project 0003' },
        ]);

        await index(data);
      });

      it('when not found project', async () => {
        await index({ ...data, text: '0' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: 'Sorry! 找不到專案',
        });

        expect(client).toHaveBeenCalledTimes(1);
        expect(client).toMatchSnapshot();
      });

      it('successfully deleted', async () => {
        client.mockReturnValueOnce([]);

        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: expect.stringContaining('請選擇要刪除的專案（輸入代碼）？'),
        });

        await index({ ...data, text: '1' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100',
          text: 'Done, 刪除 g0ver box 專案',
        });

        expect(client).toHaveBeenCalledTimes(2);
        expect(client).toMatchSnapshot();
      });
    });
  });
});
