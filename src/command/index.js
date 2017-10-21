import XRegExp from 'xregexp';
import Slack from '../Slack';
import cmdHelp from './help';
import cmdIn from './in';
import cmdOut from './out';
import cmdAll from './all';
import cmdAdd from './add';
import cmdDel from './del';
import cmdWhoami from './whoami';
import cmdSearch from './search';
import cmdWhois from './whois';
import cmdSlogan from './slogan';

const qna = [
  { handler: cmdHelp, regexp: /^help/i },
  { handler: cmdIn, regexp: new XRegExp('^in (?<note>.+)', 'i') },
  { handler: cmdOut, regexp: /^out/i },
  { handler: cmdAll, regexp: /^all/i },
  { handler: cmdAdd, regexp: new XRegExp('add (?<skill>[^ ]+)', 'i') },
  { handler: cmdDel, regexp: new XRegExp('del (?<skill>[^ ]+)', 'i') },
  { handler: cmdWhoami, regexp: /^whoami/i },
  { handler: cmdSearch, regexp: new XRegExp('search (?<keyword>[^ ]+)', 'i') },
  { handler: cmdWhois, regexp: new XRegExp('whois (?<name>[^ ]+)', 'i') },
  { handler: cmdSlogan, regexp: new XRegExp('slogan (?<slogan>.+)', 'i') },
];

export default async function (data) {
  const { channel, text } = data;

  let index = 0;
  let answer;

  do {
    const { handler, regexp } = qna[index];
    const match = XRegExp.exec(text, regexp);
    if (match) answer = await handler(match, data);
    index += 1;
  } while (!answer && index < qna.length);

  if (!answer) {
    Slack.postMessage({ channel, text: await cmdHelp() });
    return;
  }

  Slack.postMessage({ channel, text: answer });
}
