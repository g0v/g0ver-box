import _ from 'lodash';
import slack from 'slack';

export const bot = slack.rtm.client();

const TOKEN = process.env.SLACK_TOKEN;

if (TOKEN) {
  bot.listen({ token: TOKEN });
}

bot.hello((message) => {
  console.log(`Got a message: ${message.type}`);
});

const call = (name, req = {}) => (
  new Promise((resolve, reject) => {
    const fn = _.get(slack, name);
    fn(
      { ...req, token: TOKEN },
      (err, res) => (err ? reject(err) : resolve(res))
    );
  })
);

export default {
  userInfo: async req => await call('users.info', req),
  postMessage: async req => await call('chat.postMessage', { ...req, as_user: true }),
  postMultiMessage: async (users, message) => _.map(users, user => bot.ws.send(JSON.stringify({
    id: `${user}::${Date.now()}`, type: 'message', channel: user, text: message,
  }))),
  channelInfo: async req => await call('channels.info', req),
  channelJoin: async req => await call('channels.join', req),
};
