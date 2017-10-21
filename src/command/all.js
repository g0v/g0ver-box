import _ from 'lodash';
import Task from '../model/Task';

export default async function () {
  const task = new Task();
  task.where('expired_at', '>', new Date());

  return _.map(await task.fetchAll(), ({ user, note }) => `${user} in ${note}`).join('\n');
}
