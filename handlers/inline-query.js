const RakdosCard = require('../models/rakdos/card');
const ScryfallApi = require('../helpers/scryfall');
const CardFaceResult = require('../models/results/card-face');
const CardPriceResult = require('../models/results/card-price');
const CardLegalityResult = require('../models/results/card-legality');
const CardArtResult = require('../models/results/card-art');
const RakdosQuery = require('../helpers/rakdos-query');

const api = new ScryfallApi();

async function search(rakdosQuery) {
    const results = await api.search({
        q: rakdosQuery.text,
    });
    let articles = [];
    if (results.data) {
        results.data.forEach((card) => {
            const rakdosCard = new RakdosCard(card);
            const cardResult = rakdosCard.faces.map((cardFace) => {
                if (rakdosQuery.isPrice) {
                    return new CardPriceResult(rakdosCard, cardFace);
                }
                if (rakdosQuery.isLegality) {
                    return new CardLegalityResult(rakdosCard, cardFace);
                }
                if (rakdosQuery.isArt) {
                    return new CardArtResult(rakdosCard, cardFace);
                }
                return new CardFaceResult(rakdosCard, cardFace);
            });
            articles = [].concat.apply(articles, cardResult);
        });
    }
    return articles;
}

async function inlineQueryHandler(inlineQuery) {
    if (!inlineQuery.query) {
        return null;
    }
    const rq = new RakdosQuery(inlineQuery.query);
    const results = await search(rq);
    return results;
}

module.exports = {inlineQueryHandler};
