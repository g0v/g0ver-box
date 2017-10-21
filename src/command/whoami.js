import G0ver from '../model/G0ver';
import Task from '../model/Task';

export default async function (match, { name }) {
  const g0ver = await G0ver.load(name);

  const task = new Task({ user: name });
  await task.where('expired_at', '>', new Date()).fetch();

  const reply = ((g0ver && g0ver.skills) || []).join(', ');

  return [
    name,
    g0ver && g0ver.slogan,
    task.note ? `目前正在填 ${task.note} 坑` : '尚未入坑，歡迎尋找 g0v 大使的協助',
    reply ? `已登錄的技能 ${reply}` : '請使用 `add <skill name>` 新增你的技能',
  ].join('\n');
}
