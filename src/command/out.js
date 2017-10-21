import Task from '../model/Task';

export default async function ({ note }, { name }) {
  const task = new Task({ user: name });
  if (!await task.where('expired_at', '>', new Date()).fetch()) {
    return `${name} 目前沒有入坑`;
  }

  await task.save({ expiredAt: new Date() });

  return `${name} 跟大家分享 ${task.note} 吧!`;
}
