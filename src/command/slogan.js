import G0ver from '../model/G0ver';

export default async function ({ slogan }, { user }) {
  if (!slogan) return null;

  const g0ver = await G0ver.load(user) || await new G0ver({ id: user }).create();
  g0ver.slogan = slogan;

  await g0ver.save();

  return `done it, setting ${slogan}.`;
}
