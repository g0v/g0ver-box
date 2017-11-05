import _ from 'lodash';
import moment from 'moment';
import Event from '../model/Event';
import Interaction from '../model/Interaction';

async function saveEvent(user, inputs) {
  const event = new Event({ ...inputs, user });

  try {
    await event.save();
    return `Done, jothon ${inputs.title}`;
  } catch (e) {
    return `Failed, ${e.message}`;
  }
}

function confirm(user, inputs) {
  Interaction.set(user, ({ text }) => {
    const check = _.trim(text);
    if (!(check === 'yes')) return '無法判斷的指令';

    return saveEvent(user, inputs);
  });

  return {
    text: '請確認資料如下？（輸入 yes 完成建立）\n`（輸入 exit 可離開）`',
    attachments: [{
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      title: inputs.title,
      title_link: inputs.url,
      text: [
        `<!date^${inputs.datetime.getTime()}^{date_num} at {time}|unknown>`,
        `聯絡人: <@${user}>`,
      ].join('\n'),
    }],
  };
}

function inputURL(user, inputs) {
  Interaction.set(user, ({ text }) => {
    let url = _.trim(text);

    if (url === 'skip') url = null;

    return confirm(user, { ...inputs, url });
  });

  return '請輸入 活動資訊 / 報名 連結？\n`（輸入 skip 可跳過）` `（輸入 exit 可離開）`';
}

function inputDatetime(user, inputs) {
  Interaction.set(user, ({ text }) => {
    let datetime = _.trim(text);

    const date = moment();

    if (!/^\d{4}-/.test(datetime)) datetime = `${date.year()}-${datetime}`;
    if (!/[-+][\d:]+$/.test(datetime)) datetime = `${datetime}+08`;

    datetime = moment(datetime);

    if (!datetime.isValid()) return '日期時間格式錯誤，請重新輸入';

    if (datetime.isBefore()) {
      datetime.year(date.add(1, 'year').year());
    }

    return inputURL(user, { ...inputs, datetime: datetime.toDate() });
  });

  return '請輸入 RFC2822 或 ISO8601 格式的 活動時間 預設為 +08 時區 （ex. 12-31 23:00+08）？\n`（輸入 exit 可離開）`';
}

export default async function ({ title }, { user }) {
  const event = new Event({ title });

  if (await event.fetch()) return 'Sorry! 發現相同的活動名稱';

  const inputs = { title };
  return inputDatetime(user, inputs);
}
