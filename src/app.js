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
  return _.get(reply, 'user.name', null);
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
