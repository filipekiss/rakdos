const RakdosCard = require('../models/rakdos/card');
const ScryfallApi = require('../helpers/scryfall');
const CardResult = require('../models/rakdos/card-result');

const api = new ScryfallApi();

async function inlineQueryHandler(inlineQuery) {
    if (!inlineQuery.query) {
        console.log('No query');
        return;
    }
    const results = await api.search({
        q: inlineQuery.query,
    });
    let articles = [];
    if (results.data) {
        console.log('Results found');
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
        return articles;
    }
    console.log('NO Results Found');

}

module.exports = {inlineQueryHandler};
