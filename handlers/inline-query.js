const RakdosCard = require('../models/rakdos/card');
const ScryfallApi = require('../helpers/scryfall');
const CardFaceResult = require('../models/rakdos/card-face-result');

const api = new ScryfallApi();

async function inlineQueryHandler(inlineQuery) {
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
            const cardResult = rakdosCard.faces.map(
                (cardFace) => new CardFaceResult(rakdosCard, cardFace)
            );
            articles = [].concat.apply(articles, cardResult);
        });
        return articles;
    }
}

module.exports = {inlineQueryHandler};
