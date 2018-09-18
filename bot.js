const Telegraf = require('telegraf');
const {inlineQueryHandler} = require('./handlers/inline-query');
const {messageHandler} = require('./handlers/incoming-message');
const {handleCallbackQuery} = require('./handlers/callback-query');

const bot = new Telegraf(process.env.BOT_TOKEN, {username: 'RakdosBot'});
const CACHE_TIME = process.env.CACHE_TIME ? process.env.CACHE_TIME : 600;

bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
    const articles = await inlineQueryHandler(inlineQuery);
    answerInlineQuery(articles, {
        cache_time: CACHE_TIME,
    });
});

bot.start((ctx) =>
    ctx.replyWithHTML(`
Welcome to Rakdos! I'm a bot dedicated to finding M:tG card info for you. For instructions on how to use me, please, see https://github.com/filipekiss/rakdos#rakdos
`)
);

bot.help((ctx) =>
    ctx.replyWithHTML(`
For instructions on how to use me, please, see https://github.com/filipekiss/rakdos#rakdos
`)
);

bot.on('callback_query', handleCallbackQuery);

bot.hears(messageHandler.trigger, messageHandler.handler);

module.exports = bot;
