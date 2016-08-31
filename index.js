var Botkit = require('botkit');
var config = require('./config.json');

var controller = Botkit.slackbot();

var bot = controller.spawn({
  token: config.slack.token
});

bot.startRTM(function (error, bot, payload) {
  if (error) {
    throw new Error('Error connecting to Slack');
  }
});

mudCommands = [
  '^(exp)(?:(e|er|eri|erie|erienc|erience)?)$',
  '^(st)(?:(a|at)?)$'
];

controller.hears(mudCommands, ['ambient'], function (bot, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'smirk'
  }, function (error) {
    if (error) {
      bot.botkit.log('Error reacting to "' + message + '"', error);
    }
  });
});
