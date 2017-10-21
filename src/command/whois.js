import G0ver from '../model/G0ver';
import Task from '../model/Task';

export default async function ({ name }) {
  const g0ver = await G0ver.load(name);

  const task = new Task({ user: name });
  await task.where('expired_at', '>', new Date()).fetch();

  const reply = ((g0ver && g0ver.skills) || []).join(', ');

  return [
    name,
    g0ver && g0ver.slogan,
    task.note ? `目前正在填 ${task.note} 坑` : '目前需要大家協助推坑',
    reply ? `已登錄的技能 ${reply}` : '需要大使協助指導登錄技能',
  ].join('\n');
}
