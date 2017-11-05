import _ from 'lodash';
import moment from 'moment';
import Interaction from '../model/Interaction';
import Task from '../model/Task';
import Project from '../model/Project';

async function save(user, inputs) {
  const query = Task.queryBuilder;
  await query
    .where({ user_id: user })
    .whereNull('deleted_at')
    .where('expired_at', '>', new Date())
    .update({ expired_at: new Date() });

  const { hours, ...otherInputs } = inputs;

  const task = new Task({
    ...otherInputs,
    expiredAt: moment().add(hours, 'hours').toDate(),
  });
  await task.save();

  return `Done, in${inputs.note ? ` ${inputs.note}` : ''} ${hours} hr`;
}

async function inputNote(user, inputs) {
  if (inputs.note) return save(user, inputs);

  Interaction.set(user, async ({ text }) => {
    let note = _.trim(text);
    if (note === 'skip') note = null;

    return save(user, { ...inputs, note });
  });

  return '是否為此次目標做個日誌？\n`（輸入 skip 可跳過）`';
}

async function inputProject(user, inputs) {
  const query = new Project();
  const projects = await query.fetchAll();

  if (projects.length < 1) {
    return inputNote(user, inputs);
  }

  const handler = ({ text }) => {
    const index = _.trim(text);
    const project = projects[index - 1] || null;

    if (['skip', '0'].indexOf(index) < 0 && !project) {
      Interaction.set(user, handler);
      return 'Sorry! 找不到專案，請重試';
    }

    return inputNote(user, { ...inputs, project });
  };

  Interaction.set(user, handler);

  return [
    '請問是否為下列專案（輸入代碼）？\n`（輸入 skip 可跳過）`',
    '*0*. none',
    _.map(projects, (project, idx) => `*${idx + 1}*. ${project.title}`).join('\n'),
  ].join('\n');
}

export default async function ({ value }, { user }) {
  const note = _.trim(value);

  const hours = parseInt(/ \d+$/i.exec(note), 10) || 8;

  return inputProject(user, { note: note.replace(/ \d+$/i, ''), hours });
}
