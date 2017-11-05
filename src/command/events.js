import _ from 'lodash';
import Event from '../model/Event';

export default async function () {
  const query = new Event();
  const events = await query.fetchAll();
  return {
    text: '下列活動歡迎你的參加：',
    attachments: _.map(events, event => ({
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      title: event.title,
      title_link: event.url,
      text: [
        `<!date^${event.datetime.getTime()}^{date_num} at {time}|unknown>`,
        `聯絡人: <@${event.user}>`,
      ].join('\n'),
    })),
  };
}
