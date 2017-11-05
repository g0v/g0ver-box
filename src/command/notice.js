import _ from 'lodash';
import Slack from '../Slack';
import Project from '../model/Project';
import Event from '../model/Event';
import Interaction from '../model/Interaction';

const typeNmae = {
  Event: '活動',
  Project: '專案',
};

async function notifyFollower(user, inputs) {
  const { target, message } = inputs;

  await Slack.postMultiMessage(target.follower, message);

  const { name } = target.constructor;
  return `Done, 發送 ${target.title} ${typeNmae[name]}通知`;
}

function confirm(user, inputs) {
  Interaction.set(user, ({ text }) => {
    const check = _.trim(text);
    if (!(check === 'yes')) return '無法判斷的指令';

    return notifyFollower(user, inputs);
  });

  const { target } = inputs;
  const { name } = target.constructor;

  return {
    text: [
      '請確認發送訊息通知的內容如下？（輸入 yes 立即發送）',
      '`（輸入 exit 可離開）`',
      '---',
      `來自 *${target.title}* ${typeNmae[name]}的通知：`,
      inputs.message,
    ].join('\n'),
  };
}

async function importMessage(user, inputs) {
  if (inputs.message) return confirm(user, inputs);

  Interaction.set(user, async ({ text }) => {
    const message = _.trim(text);
    return confirm(user, { ...inputs, message });
  });

  return '請輸入發送訊息通知的內容？\n`（輸入 exit 可離開）`';
}

async function inputTarget(user, inputs) {
  const targets = _.concat(
    await (new Event({ user })).whereBefore().fetchAll(),
    await (new Project({ user })).fetchAll(),
  );

  if (targets.length < 1) return 'Sorry! 找不到可發訊息通知的專案或活動';

  const handler = async ({ text }) => {
    const index = _.trim(text);
    const target = targets[index - 1];

    if (!target) {
      Interaction.set(user, handler);
      return '錯誤的專案或活動代碼，請重新輸入';
    }

    return importMessage(user, { ...inputs, target });
  };

  Interaction.set(user, handler);

  return [
    '請選擇要發訊息通知的專案或活動（輸入代碼）？\n`（輸入 exit 可離開）`',
    _.map(targets, (target, idx) => (
      `*${idx + 1}*. ${target.title} ${typeNmae[target.constructor.name]}`)
    ).join('\n'),
  ].join('\n');
}

export default async function ({ value }, { user }) {
  const message = _.trim(value);

  return inputTarget(user, { message });
}
