import Task from '../model/Task';

export default async function ({ note }, { user, name }) {
  const task = new Task({ user });
  if (!await task.where('expired_at', '>', new Date()).fetch()) {
    return `${name} 目前沒有入坑`;
  }

  await task.save({ expiredAt: new Date() });

  return `${name} 跟大家分享 ${task.note} 吧!`;
}
