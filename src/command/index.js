import _ from 'lodash';
import XRegExp from 'xregexp';
import Slack, { bot } from '../Slack';
import Interaction from '../model/Interaction';
import cmdHelp from './help';
import cmdIn from './in';
import cmdOut from './out';
import cmdAll from './all';
import cmdAdd from './add';
import cmdDel from './del';
import cmdCreate from './create';
import cmdRemove from './remove';
import cmdProjects from './projects';
import cmdJothon from './jothon';
import cmdCancel from './cancel';
import cmdEvents from './events';
import cmdFollow from './follow';
import cmdUnfollow from './unfollow';
import cmdNotice from './notice';
import cmdWhoami from './whoami';
import cmdSearch from './search';
import cmdWhois from './whois';
import cmdSlogan from './slogan';

const qna = [
  { handler: cmdIn, regexp: new XRegExp('^in(?<value>.*)', 'i') },
  { handler: cmdOut, regexp: /^out/i },
  { handler: cmdAll, regexp: /^all/i },
  { handler: cmdAdd, regexp: new XRegExp('^add (?<hashtag>.+)', 'i') },
  { handler: cmdDel, regexp: new XRegExp('^del (?<hashtag>.+)', 'i') },
  { handler: cmdCreate, regexp: new XRegExp('^create (?<title>.+)', 'i') },
  { handler: cmdRemove, regexp: new XRegExp('remove(?<value>.*)', 'i') },
  { handler: cmdProjects, regexp: /^projects/i },
  { handler: cmdJothon, regexp: new XRegExp('^jothon (?<title>.+)', 'i') },
  { handler: cmdCancel, regexp: new XRegExp('^cancel(?<value>.*)', 'i') },
  { handler: cmdEvents, regexp: /^events/i },
  { handler: cmdFollow, regexp: new XRegExp('^follow(?<value>.*)', 'i') },
  { handler: cmdUnfollow, regexp: new XRegExp('^unfollow(?<value>.*)', 'i') },
  { handler: cmdNotice, regexp: new XRegExp('^notice(?<value>.*)', 'i') },
  { handler: cmdWhoami, regexp: /^whoami/i },
  { handler: cmdSearch, regexp: new XRegExp('^search (?<keyword>.+)', 'i') },
  { handler: cmdWhois, regexp: new XRegExp('^whois <@(?<user>[^>]+)>', 'i') },
  { handler: cmdSlogan, regexp: new XRegExp('^slogan (?<slogan>.+)', 'i') },
];

export default async function (data) {
  const { channel, user, text } = data;
  const message = _.trim(text);

  let index = 0;
  let answer;

  if (['bye', 'exit'].indexOf(message) > -1) {
    answer = 'Bye, miss U.';
    Interaction.delete(user);
  }

  const interaction = Interaction.get(user);
  if (interaction) {
    Interaction.delete(user);
    answer = await interaction(data);
  }

  while (!answer && index < qna.length) {
    const { handler, regexp } = qna[index];
    const match = XRegExp.exec(message, regexp);
    if (match) answer = await handler(match, data);
    index += 1;
  }

  if (!answer) answer = await cmdHelp();

  if (_.isPlainObject(answer)) {
    Slack.postMessage({ channel, ...answer });
    return;
  }

  Slack.postMessage({ channel, text: answer });
}
