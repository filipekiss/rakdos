const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const ScryfallApi = require('./scryfall');
const http = require('http');

const rakdosVersion = '0.1.1';

// async/await example.

try {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const api = new ScryfallApi();

    const buildPhotoResult = (card) => {
        if (card && card.name && card.image_uris) {
            console.log(`Building ${card.name}`)
            const cardDetails = {
                type: 'photo',
                id: `rakdosbot-${rakdosVersion}--${card.id}`,
                photo_url: card.image_uris.large,
                thumb_url: card.image_uris.small,
                title: `${card.name}`,
                reply_markup: Markup.inlineKeyboard([
                    Markup.urlButton('View In Scryfall', card.scryfall_uri, !card.scryfall_uri),
                    Markup.urlButton('View In Gatherer', card.related_uris.gatherer, !card.related_uris.gatherer),
                ]),
            };
            console.log(cardDetails)
            return cardDetails
        }
        if (card && card.card_faces) {
            console.log(`Bulding ${card.name} (Face 0)`)
            const cardDetails = {
                type: 'photo',
                id: `rakdosbot-${rakdosVersion}--${card.id}`,
                photo_url: card.card_faces[0].image_uris.large,
                thumb_url: card.card_faces[0].image_uris.small,
                reply_markup: Markup.inlineKeyboard([
                    Markup.urlButton('View In Scryfall', card.scryfall_uri, !card.scryfall_uri),
                    Markup.callbackButton('View Oracle Text', `oracle:${card.id}`),
                ]),
            }
            console.log(cardDetails);
            return cardDetails;
        }
    };

    bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
        if (inlineQuery.query.length > 3) {
            const results = await api.search({
                q: inlineQuery.query,
            });
            if (results.data) {
                const answers = results.data.map((card) =>
                    buildPhotoResult(card)
                );
                answerInlineQuery(answers, {
                    cache_time: 600,
                });
            }
        } else {
            console.log('Inline Query Length must be > 3');
        }
    });

    bot.on('callback_query', async (ctx) => {
        const chatId = ctx.update.callback_query.chat_instance;
        const callbackData = ctx.update.callback_query.data.split(':');
        const action = callbackData[0];
        if (action === 'oracle') {
            const results = await api.getCard(callbackData[1]);
            ctx.telegram.sendMessage(chatId,results)
        }

        // Using shortcut
        // ctx.answerCbQuery()
    })

    bot.startPolling();

    const server = http.createServer((req, res) => {
        res.end('<h1>Rakdos Bot - See <a href="https://github.com/filipekiss/rakdos">the github repo</a> for issues and suggestions</h1>')
    });
    server.listen(3000, '0.0.0.0');
} catch (err) {
    console.error(err);
}
