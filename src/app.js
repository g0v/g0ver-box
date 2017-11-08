import 'babel-polyfill';
import _ from 'lodash';
import express from 'express';
import expressGraphQL from 'express-graphql';
import DataLoader from 'dataloader';
import Slack, { bot } from './Slack';
import Schema from './Schema';
import command from './command';

const NODE_PORT = process.env.PORT || 8080;
const BOT_NAME = process.env.SLACK_BOT_ID || 'g0ver';

const users = new DataLoader(keys => Promise.all(_.map(keys, async (user) => {
  const reply = await Slack.userInfo({ user });
  return _.get(reply, 'user.profile.display_name', _.get(reply, 'user.name', null));
})));

const server = express();

server.use('/', expressGraphQL({
  schema: Schema,
  pretty: true,
  graphiql: true,
  formatError: (error) => {
    console.error(error);
    return {
      name: error.name || 'UnknownError',
      message: error.message || 'Unknown Error',
    };
  },
}));

server.listen(NODE_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${NODE_PORT}`
));

bot.message(async (data) => {
  const { channel, user, username } = data;
  const text = data.text.replace(new RegExp(` *<@${BOT_NAME}> *`, 'i'), '');

  if (username === 'bot' || user === BOT_NAME) return;

  if (!(
    /^D/.test(channel) ||
    (/^C/.test(channel) && (data.text || '').search(`<@${BOT_NAME}>`) > -1)
  )) return;

  console.log('rtm: ', JSON.stringify(data));

  const name = await users.load(user);

  command({ ...data, name, text });
});


let generalId;
bot.member_joined_channel(async (data) => {
  const { channel, user } = data;

  if (!generalId) {
    const reply = await Slack.channelInfo({ channel });
    const isGeneral = _.get(reply, 'channel.is_general', false);
    if (isGeneral) generalId = channel;
  }

  if (channel !== generalId) return;

  Slack.postMessage({
    channel: user,
    text: [
      `歡迎 <@${user}> 來到 g0v 社群`,
      '私訊 <@g0ver> 並輸入 `help`，我將熱血為您服務。也可以輸入 `search g0v大使` 這些人可以協助你了解 g0v',
    ].join('\n'),
    attachments: [{
      color: '#000',
      mrkdwn_in: ['text', 'pretext', 'fields'],
      text: '*了解更多*\n <http://g0v.tw/zh-TW/manifesto.html|g0v 宣言> - <https://g0v-jothon.kktix.cc/|g0v 揪松團> - <https://www.facebook.com/g0v.tw/|g0v 粉絲專頁> - <https://github.com/g0v|g0v Github>',
    }],
  });
});
