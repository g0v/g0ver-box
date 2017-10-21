import G0ver from '../model/G0ver';

export default async function ({ slogan }, { name }) {
  if (!slogan) return null;

  const g0ver = await G0ver.load(name) || await new G0ver({ id: name }).create();
  g0ver.slogan = slogan;

  await g0ver.save();

  return `done it, setting ${slogan}.`;
}
