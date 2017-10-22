import _ from 'lodash';
import G0ver from '../model/G0ver';

export default async function ({ skill }, { user }) {
  if (!skill) return null;
  const lowerSkill = _.toLower(skill);

  const g0ver = await G0ver.load(user) || await new G0ver({ id: user }).create();
  g0ver.skills = _.remove(g0ver.skills || [], value => (_.toLower(value) !== lowerSkill));
  await g0ver.save();

  return `done it, del ${skill}.`;
}
