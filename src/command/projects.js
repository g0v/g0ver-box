import _ from 'lodash';
import Project from '../model/Project';

export default async function () {
  const query = new Project();
  const projects = await query.fetchAll();
  return {
    text: '下列專案歡迎你的加入：',
    attachments: _.map(projects, project => ({
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      thumb_url: project.thumb,
      title: project.title,
      title_link: project.url,
      text: _.filter([`坑主: <@${project.user}>`, project.tags]).join('\n'),
    })),
  };
}
