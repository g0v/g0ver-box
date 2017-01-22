import _ from 'lodash';
import slack from '../../slack';

export default function (keyword, data) {
  const { channel, name } = data;

  _.pull(keyword, '我', '可以');

  if (keyword.length > 0) {
    slack.postMessage({ channel, text: `@${name} 可以幫忙 ${keyword.join(', ')}. (沒有機器人還在學習媒合)` });
    return;
  }
}
