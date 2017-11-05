import _ from 'lodash';
import Event from '../model/Event';
import Interaction from '../model/Interaction';

async function inputEvent(user) {
  const query = new Event({ user });
  const events = await query.fetchAll();

  if (events.length < 1) return 'Sorry! 找不到活動，快來揪松吧';

  Interaction.set(user, async ({ text }) => {
    const index = _.trim(text);
    const event = events[index - 1];
    if (!event) return 'Sorry! 找不到活動';

    await event.destroy();
    return `Done, 取消 ${event.title} 活動`;
  });

  return [
    '請選擇要取消的活動（輸入代碼）？\n`（輸入 exit 可離開）`',
    _.map(events, (event, idx) => `*${idx + 1}*. ${event.title}`).join('\n'),
  ].join('\n');
}

export default async function ({ value }, { user }) {
  const title = _.trim(value);
  if (title) {
    const event = await (new Event({ title })).fetch();
    if (!event) return 'Sorry! 找不到活動';
    if (event.user !== user) return `Sorry! 沒有權限取消 ${title} 活動`;

    await event.destroy();
    return `Done, 取消 ${title} 活動`;
  }

  return inputEvent(user);
}
