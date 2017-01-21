import _ from 'lodash';
import slack from 'slack';

export const bot = slack.rtm.client();

if (process.env.SLACK_TOKEN) {
  bot.listen({ token: process.env.SLACK_TOKEN });
}

bot.hello((message) => {
  console.log(`Got a message: ${message.type}`);
});

const call = (name, req = {}) => (
  new Promise((resolve, reject) => {
    const fn = _.get(slack, name);
    fn(
      { ...req, token: process.env.SLACK_TOKEN },
      (err, res) => (err ? reject(err) : resolve(res))
    );
  })
);

export default {
  userInfo: async req => await call('users.info', req),
  postMessage: async req => await call('chat.postMessage', { ...req, as_user: true }),
  channelInfo: async req => await call('channels.info', req),
  channelJoin: async req => await call('channels.join', req),
};
