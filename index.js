const Telegraf = require('telegraf');
const ScryfallApi = require('./scryfall');

// async/await example.

try {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const api = new ScryfallApi();

    const buildPhotoResult = (card) => {
        if (card && card.name && card.image_uris) {
            return {
                type: 'photo',
                id: `rakdosbot--${card.id}`,
                title: card.name,
                photo_url: card.image_uris.large,
                thumb_url: card.image_uris.small,
                description: card.oracle_text,
                caption: card.name,
                parse_mode: 'Markdown',
            };
        }
    };

    bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {
        if (inlineQuery.query.length > 3) {
            console.log(inlineQuery.query);
            const results = await api.search({
                q: inlineQuery.query,
            });
            if (results.data) {
                const answers = results.data.map((card) =>
                    buildPhotoResult(card)
                );
                answerInlineQuery(answers);
            }
        } else {
            console.log('Inline Query Length must be > 3');
        }
    });

    bot.startPolling();
} catch (err) {
    console.error(err);
}
