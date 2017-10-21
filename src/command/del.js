import _ from 'lodash';
import G0ver from '../model/G0ver';

export default async function ({ skill }, { name }) {
  if (!skill) return null;

  const g0ver = await G0ver.load(name) || await new G0ver({ id: name }).create();
  g0ver.skills = _.pull(g0ver.skills || [], skill);
  await g0ver.save();

  return `done it, del ${skill}.`;
}
