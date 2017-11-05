import _ from 'lodash';
import Project from '../model/Project';
import Interaction from '../model/Interaction';

async function inputProject(user) {
  const query = new Project({ user });
  const projects = await query.fetchAll();

  if (projects.length < 1) return 'Sorry! 找不到坑，快來挖坑吧';

  Interaction.set(user, async ({ text }) => {
    const index = _.trim(text);
    const project = projects[index - 1];
    if (!project) return 'Sorry! 找不到專案';

    await project.destroy();
    return `Done, 刪除 ${project.title} 專案`;
  });

  return [
    '請選擇要刪除的專案（輸入代碼）？\n`（輸入 exit 可離開）`',
    _.map(projects, (project, idx) => `*${idx + 1}*. ${project.title}`).join('\n'),
  ].join('\n');
}

export default async function ({ value }, { user }) {
  const title = _.trim(value);
  if (title) {
    const project = await (new Project({ title })).fetch();
    if (!project) return 'Sorry! 找不到專案';
    if (project.user !== user) return `Sorry! 沒有權限刪除 ${title} 專案`;

    await project.destroy();
    return `Done, 刪除 ${title} 專案`;
  }

  return inputProject(user);
}
