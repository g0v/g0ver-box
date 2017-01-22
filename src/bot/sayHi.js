import _ from 'lodash';
import slack from '../../slack';

export default function (keyword, data) {
  const { channel, name } = data;
  const ans = _.sample([
    '你好！ 填坑大吉',
    '先承認你就是沒有人',
    '兩個月會有一次大松，記得報名喔！',
    '偷偷告訴你！ 我出生於基礎建設黑客松',
    '不要調戲我啦！',
    'Did you follow me?  https://twitter.com/g0vtw',
  ]);

  slack.postMessage({ channel, text: `@${name} ${ans}` });
}
