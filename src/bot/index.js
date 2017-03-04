import _ from 'lodash';
import natural from '../lib/natural';
import slack from '../../slack';
import sayHi from './sayHi';
import addSkill from './addSkill';

const qna = {
  '^hello$': sayHi,
  '^me can': addSkill,
};

export default function (data) {
  const { channel, name, text } = data;
  const keyword = natural(text);

  if (keyword.length > 1) _.pull(keyword, 'hello');

  console.log('keyword: ', JSON.stringify(keyword));
  const question = keyword.join('');
  const answer = _.find(qna, (handler, regex) => new RegExp(regex).test(question));

  if (!answer) {
    slack.postMessage({ channel, text: `@${name} 現在能聽懂的不多！願意幫助我嗎？ https://github.com/g0v/g0ver-box` });
    return;
  }

  answer(keyword, data);
}
