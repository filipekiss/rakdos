/* eslint-disable no-console */
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const http = require('http');
const ScryfallApi = require('./scryfall');

const rakdosVersion = '0.2.0';

// async/await example.

try {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const api = new ScryfallApi();

    /* eslint-disable-next-line no-inner-declarations, consistent-return */
    function buildCardImage(set, id, side = '', size = 'large') {
        const cardImage = `https://img.scryfall.com/cards/${size}/en/${set}/${id}${side}.jpg`;
        return cardImage;
    }

    function buildManaCost(card) {
        if (card.mana_cost) {
            return card.mana_cost.replace(/[{}]/g, '');
        }
        if (card.card_faces && card.card_faces[0].mana_cost) {
            return card.card_faces[0].mana_cost.replace(/[{}]/g, '');
        }
        return '';
    }

    function buildOracleText(card) {
        if (card.oracle_text) {
            return card.oracle_text;
        }
        if (card.card_faces && card.card_faces[0].oracle_text) {
            return card.card_faces[0].oracle_text;
        }
        return '';
    }
    /* eslint-disable-next-line no-inner-declarations, consistent-return */
    function buildArticleReturn(card) {
        let cardSide;
        if (card && card.card_faces) {
            cardSide = 'a';
        }
        const cardImageLarge = buildCardImage(
            card.set,
            card.collector_number,
            cardSide,
            'large'
        );
        const cardImageThumb = buildCardImage(
            card.set,
            card.collector_number,
            cardSide,
            'art_crop'
        );
        const cardDetails = {
            type: 'article',
            id: `rakdosbot-${rakdosVersion}--${card.id}`,
            title: card.name,
            input_message_content: {
                message_text: `<strong>${card.name}</strong> (${buildManaCost(
                    card
                )}) <a href="${cardImageLarge}">&#8205;</a>`,
                parse_mode: 'HTML',
            },
            thumb_url: cardImageThumb,
            description: buildOracleText(card),
            reply_markup: Markup.inlineKeyboard([
                Markup.urlButton(
                    'View In Scryfall',
                    card.scryfall_uri,
                    !card.scryfall_uri
                ),
                Markup.urlButton(
                    'View In Gatherer',
                    card.related_uris.gatherer,
                    !card.related_uris.gatherer
                ),
            ]),
        };
        return cardDetails;
    }

    bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
        if (!inlineQuery.query) {
            return;
        }
        const results = await api.search({
            q: inlineQuery.query,
        });
        if (results.data) {
            const answers = results.data.map((card) =>
                buildArticleReturn(card)
            );
            answerInlineQuery(answers, {
                cache_time: 600,
            });
        }
    });

    bot.on('callback_query', async (ctx) => {
        const chatId = ctx.update.callback_query.chat_instance;
        const callbackData = ctx.update.callback_query.data.split(':');
        const action = callbackData[0];
        if (action === 'oracle') {
            const results = await api.getCard(callbackData[1]);
            ctx.telegram.sendMessage(chatId, results);
        }
    });

    bot.startPolling();

    const server = http.createServer((req, res) => {
        res.end(
            '<h1>Rakdos Bot - See <a href="https://github.com/filipekiss/rakdos">the github repo</a> for issues and suggestions</h1>'
        );
    });
    server.listen(3000, '0.0.0.0');
} catch (err) {
    console.error(err);
}
