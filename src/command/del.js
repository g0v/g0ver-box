import _ from 'lodash';
import G0ver from '../model/G0ver';

export default async function ({ hashtag }, { user }) {
  if (!hashtag) return null;
  const hashtags = _.map(_.split(hashtag, /[,，]/), value => _.trim(value, ' <>'));

  const g0ver = await G0ver.load(user) || await new G0ver({ id: user }).create();
  g0ver.skills = _.remove(g0ver.skills || [], value => (_.indexOf(hashtags, value) < 0));
  await g0ver.save();

  return `done it, del ${hashtag}.`;
}
