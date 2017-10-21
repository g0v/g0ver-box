import G0ver from '../model/G0ver';

export default async function (match, { name }) {
  const g0ver = await G0ver.load(name);

  const reply = ((g0ver && g0ver.skills) || []).join(', ');

  return reply ? `${name} 已登錄的技能 ${reply}` : '請使用 `add <skill name>` 新增你的技能';
}
