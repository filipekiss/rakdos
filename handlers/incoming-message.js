const ScryfallApi = require('../helpers/scryfall');
const RakdosCard = require('../models/rakdos/card');
const RakdosQuery = require('../helpers/rakdos-query');
const CardFacePhoto = require('../models/rakdos/card-face-photo');
const Legality = require('../helpers/constants/legality');
const Price = require('../helpers/constants/price');

const api = new ScryfallApi();

const CARD_PATTERN = /\[\[((?:(?!\]\]).)+)\]\]/gm;

const runRegex = function(str, regex) {
    const cards = [];
    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        cards.push(m[1]);
    }

    return cards;
};

const findCardsInString = function(str) {
    const regex = /\[\[[^!#$]((?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};

const findLegalities = function(str) {
    const regex = /\[\[#((?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};
const findPrices = function(str) {
    const regex = /\[\[\$((?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};
const findArts = function(str) {
    const regex = /\[\[!((?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};

async function buildMediaGroup(cards, imageSize) {
    const mediaGroup = cards.map(async (card) => {
        const rakdosQuery = new RakdosQuery(card);
        try {
            const scryfallCard = await api.named({
                fuzzy: rakdosQuery.text,
            });
            const rakdosCard = new RakdosCard(scryfallCard);
            return rakdosCard.faces.map(
                (currentFace) => new CardFacePhoto(currentFace, imageSize)
            );
        } catch (err) {
            const cardResult = new CardFacePhoto(rakdosQuery.text);
            return cardResult;
        }
    });
    return Promise.all(mediaGroup);
}

async function buildLegalities(cards) {
    const legalities = cards.map(async (card) => {
        const rakdosQuery = new RakdosQuery(card);
        try {
            const scryfallCard = await api.named({
                fuzzy: rakdosQuery.text,
            });
            const rakdosCard = new RakdosCard(scryfallCard);
            return [
                `<b>${rakdosCard.name}</b>\n${Legality.buildLegalityText(
                    rakdosCard,
                    '\n'
                )}`,
            ];
        } catch (err) {
            return [`${rakdosQuery.text} not found.`];
        }
    });
    return Promise.all(legalities);
}

async function buildPrices(cards) {
    const prices = cards.map(async (card) => {
        const rakdosQuery = new RakdosQuery(card);
        try {
            const scryfallCard = await api.named({
                fuzzy: rakdosQuery.text,
            });
            const rakdosCard = new RakdosCard(scryfallCard);
            return [
                `<b>${rakdosCard.name}</b>\n${Price.buildPriceTags(
                    rakdosCard
                )}`,
            ];
        } catch (err) {
            return [`${rakdosQuery.text} not found.`];
        }
    });
    return Promise.all(prices);
}

const handler = async function(ctx) {
    const cards = findCardsInString(ctx.match.input);
    const legals = findLegalities(ctx.match.input);
    const prices = findPrices(ctx.match.input);
    const arts = findArts(ctx.match.input);
    if (cards) {
        let mediaGroup = await buildMediaGroup(cards, 'large');
        mediaGroup = [].concat.apply([], mediaGroup);
        if (mediaGroup) {
            ctx.replyWithMediaGroup(mediaGroup);
        }
    }

    if (arts) {
        let mediaGroup = await buildMediaGroup(arts, 'art_crop');
        mediaGroup = [].concat.apply([], mediaGroup);
        if (mediaGroup) {
            ctx.replyWithMediaGroup(mediaGroup);
        }
    }

    if (legals) {
        let resultText = await buildLegalities(legals);
        resultText = [].concat.apply([], resultText);
        if (resultText) {
            ctx.replyWithHTML(resultText.join('\n'));
        }
    }

    if (prices) {
        let resultText = await buildPrices(prices);
        resultText = [].concat.apply([], resultText);
        if (resultText) {
            ctx.replyWithHTML(resultText.join('\n'));
        }
    }
};

const messageHandler = {
    trigger: CARD_PATTERN,
    handler,
};

module.exports = {messageHandler};
