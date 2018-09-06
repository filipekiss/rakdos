const express = require('express');
const Telegraf = require('telegraf');
const RakdosCard = require('./models/rakdos/card');
const ScryfallApi = require('./scryfall');
const CardResult = require('./models/rakdos/card-result');

const api = new ScryfallApi();
const bot = new Telegraf(process.env.BOT_TOKEN);
const expressApp = express();

bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
    if (!inlineQuery.query) {
        return;
    }
    const results = await api.search({
        q: inlineQuery.query,
    });
    let articles = [];
    if (results.data) {
        results.data.forEach((card) => {
            const rakdosCard = new RakdosCard(card);
            const cardResult = rakdosCard.faces.map((cardFace) => {
                const faceResult = {};
                faceResult.type = 'article';
                faceResult.id = `rakdosbot--${card.set}${
                    card.collector_number
                }${cardFace.face}`;
                faceResult.title = cardFace.name;
                faceResult.description = cardFace.oracle;
                faceResult.thumb_url = cardFace.getImage('art_crop');
                faceResult.input_message_content = CardResult.buildMessageContent(
                    cardFace
                );
                return faceResult;
            });
            articles = [].concat.apply(articles, cardResult);
        });
        answerInlineQuery(articles, {
            cache_time: 1,
        });
    }
});

bot.telegram.setWebhook(`${process.env.URL}/${process.env.BOT_TOKEN}`);
expressApp.use(bot.webhookCallback(`/${process.env.BOT_TOKEN}`));
expressApp.get('/', (req, res) => {
    res.send(
        '<h1>Rakdos Bot - See <a href="https://github.com/filipekiss/rakdos">the github repo</a> for issues and suggestions</h1>'
    );
});
expressApp.listen(3000);
