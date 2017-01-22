import _ from 'lodash';
import express from 'express';
import expressGraphQL from 'express-graphql';
import slack, { bot } from './slack';
import Schema from './src/Schema';
import command from './src/command';
import g0ver from './src/bot';

const NODE_PORT = process.env.PORT || 8080;

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

const users = new Map();

bot.message(async (data) => {
  const { channel, user, username } = data;
  const text = data.text.replace(new RegExp(` *<@${process.env.SLACK_BOT_ID}> *`), '');

  if (username === 'bot' || user === process.env.SLACK_BOT_ID) return;

  if (!(
    /^D/.test(channel) ||
    (/^C/.test(channel) && (data.text || '').search(`<@${process.env.SLACK_BOT_ID}>`) > -1)
  )) return;

  let name = users.get(user);

  console.log('rtm: ', JSON.stringify(data));

  if (!name) {
    const infoReply = await slack.userInfo({ user });
    name = _.get(infoReply, 'user.name');
  }

  const argument = /^([^ ]+) (.+)/.exec(text);
  if (argument && command[argument[1]]) {
    command[argument[1]]({ argument: argument[2], ...data });
    return;
  }

  g0ver({ name, ...data });
});
