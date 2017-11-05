import { client } from 'knex';
import Slack from '../../Slack';
import index from '../';

describe('in command', () => {
  const data = { channel: 'D100', user: 'U03B2AB13', name: 'yutin', text: 'in' };

  describe('in [note] [hours]', () => {
    it('when no found projects', async () => {
      client.mockReturnValueOnce([]);
      client.mockReturnValueOnce([]);
      client.mockReturnValueOnce([]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100', text: '是否為此次目標做個日誌？\n`（輸入 skip 可跳過）`',
      });

      await index({ ...data, text: 'ya! a note' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100', text: 'Done, in ya! a note 8 hr',
      });

      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(3);
    });

    it('when found projects', async () => {
      client.mockReturnValueOnce([
        { id: '3', title: 'g0ver box' },
        { id: '5', title: 'project 001' },
      ]);

      await index(data);
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100', text: expect.stringContaining('請問是否為下列專案（輸入代碼）？'),
      });

      await index({ ...data, text: '1' });
      expect(Slack.postMessage).toHaveBeenLastCalledWith({
        channel: 'D100', text: '是否為此次目標做個日誌？\n`（輸入 skip 可跳過）`',
      });

      await index({ ...data, text: 'exit' });
      expect(client).toMatchSnapshot();
      expect(client).toHaveBeenCalledTimes(1);
    });

    describe('input note', () => {
      beforeEach(async () => {
        client.mockReturnValueOnce([
          { id: '3', title: 'g0ver box' },
          { id: '5', title: 'project 001' },
        ]);

        await index(data);
        await index({ ...data, text: '1' });
      });

      it('when has note', async () => {
        client.mockReturnValueOnce([]);
        client.mockReturnValueOnce(['5']);
        await index({ ...data, text: 'note information' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100', text: 'Done, in note information 8 hr',
        });

        expect(client).toMatchSnapshot();
        expect(client).toHaveBeenCalledTimes(3);
      });

      it('when hasn\'t note', async () => {
        client.mockReturnValueOnce([]);
        client.mockReturnValueOnce(['5']);
        await index({ ...data, text: 'skip' });
        expect(Slack.postMessage).toHaveBeenLastCalledWith({
          channel: 'D100', text: 'Done, in 8 hr',
        });

        expect(client).toMatchSnapshot();
        expect(client).toHaveBeenCalledTimes(3);
      });
    });
  });

  it('in <note> [hours]', async () => {
    client.mockReturnValueOnce([]);
    await index({ ...data, text: 'in fix issue' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100', text: 'Done, in fix issue 8 hr',
    });

    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(3);
  });

  it('in <note> <hours>', async () => {
    client.mockReturnValueOnce([]);
    await index({ ...data, text: 'in fix issue 4' });
    expect(Slack.postMessage).toHaveBeenLastCalledWith({
      channel: 'D100', text: 'Done, in fix issue 4 hr',
    });

    expect(client).toMatchSnapshot();
    expect(client).toHaveBeenCalledTimes(3);
  });
});
