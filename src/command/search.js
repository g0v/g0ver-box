import _ from 'lodash';
import G0ver from '../model/G0ver';

export default async function ({ keyword }) {
  if (!keyword) return null;

  const g0ver = new G0ver();
  g0ver.search(keyword);
  const ids = _.map(await g0ver.fetchAll(), ({ nativeId }) => `@${nativeId}`);

  if (_.size(ids) < 1) {
    return `搜尋 ${keyword} 找不到 g0ver, 也許你就是這樣沒有人.`;
  }

  return `搜尋 ${keyword} 找到了這些 g0ver: ${ids.join(', ')}.`;
}
