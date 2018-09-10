const ScryfallApi = require('../helpers/scryfall');
const RakdosCard = require('../models/rakdos/card');
const CardFacePhoto = require('../models/rakdos/card-face-photo');

const api = new ScryfallApi();

const CARD_PATTERN = /\[\[((?:(?!\]\]).)+)\]\]/gm;

const findCardsInString = function(str) {
    const regex = /\[\[((?:(?!\]\]).)+)\]\]/gm;
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

const handler = async function(ctx) {
    const cards = findCardsInString(ctx.match.input);
    if (cards) {
        let mediaGroup = [];
        for (const card of cards) {
            try {
                const scryfallCard = await api.named({
                    fuzzy: card,
                });
                const rakdosCard = new RakdosCard(scryfallCard);
                const cardResult = rakdosCard.faces.map(
                    (cardFace) => new CardFacePhoto(cardFace)
                );
                mediaGroup = [].concat.apply(mediaGroup, cardResult);
            } catch (err) {
                const cardResult = [new CardFacePhoto(card)];
                mediaGroup = [].concat.apply(mediaGroup, cardResult);
            }
        }
        if (mediaGroup) {
            ctx.replyWithMediaGroup(mediaGroup);
        }
    }
};

const messageHandler = {
    trigger: CARD_PATTERN,
    handler,
};

module.exports = {messageHandler};
