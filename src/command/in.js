import moment from 'moment';
import Task from '../model/Task';

export default async function ({ note: nNote }, { user, name }) {
  const query = Task.queryBuilder;
  await query
    .where({ user_id: user })
    .whereNull('deleted_at')
    .where('expired_at', '>', new Date())
    .update({ deleted_at: new Date() });

  const hours = parseInt(/ \d+$/i.exec(nNote), 10);
  const note = nNote.replace(/ \d+$/i, '');

  const task = new Task({ user, note, expiredAt: moment().add(hours || 24, 'hours').toDate() });
  await task.save();

  return `${name} 填 ${note} 坑大吉`;
}
