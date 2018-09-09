const express = require('express');
const Telegraf = require('telegraf');
const {inlineQueryHandler} = require('./handlers/inline-query');
const {messageHandler} = require('./handlers/incoming-message');

const bot = new Telegraf(process.env.BOT_TOKEN);
const expressApp = express();

const CACHE_TIME = process.env.CACHE_TIME ? process.env.CACHE_TIME : 600;

bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
    inlineQueryHandler(inlineQuery).then((articles) => {
        answerInlineQuery(articles, {
            cache_time: CACHE_TIME,
        });
    });
});

bot.hears(messageHandler.trigger, messageHandler.handler);

if (process.env.NODE_ENV === 'production') {
    bot.telegram.setWebhook(`${process.env.URL}/${process.env.BOT_TOKEN}`);
    expressApp.use(bot.webhookCallback(`/${process.env.BOT_TOKEN}`));
    expressApp.get('/', (req, res) => {
        res.send(
            '<h1>Rakdos Bot - See <a href="https://github.com/filipekiss/rakdos">the github repo</a> for issues and suggestions</h1>'
        );
    });
    expressApp.listen(3000);
} else {
    bot.telegram.setWebhook('');
    bot.startPolling();
    console.log('Rakdos Polling Telegram Servers…');
    console.log(`Cache Time: ${CACHE_TIME}`);
}
