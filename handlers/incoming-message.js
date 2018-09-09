const ScryfallApi = require('../helpers/scryfall');
const RakdosCard = require('../models/rakdos/card');
const PhotoResult = require('../models/rakdos/photo-result');

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
        // The result can be accessed through the `m`-variable.
        // m.forEach((match, groupIndex) => {
        //     console.log(`Found match, group ${groupIndex}: ${match}`);
        // });
    }

    return cards;
};

const buildCardsReults = async function(cards) {};

const messageHandler = {
    trigger: CARD_PATTERN,
    async handler(ctx) {
        const cards = findCardsInString(ctx.match.input);
        if (cards) {
            let mediaGroup = [];
            for (const card of cards) {
                try {
                    const scryfallCard = await api.named({
                        fuzzy: card,
                    });
                    const rakdosCard = new RakdosCard(scryfallCard);
                    const cardResult = rakdosCard.faces.map((cardFace) => {
                        const faceResult = {};
                        faceResult.type = 'photo';
                        faceResult.media = cardFace.getImage('large');
                        return faceResult;
                    });
                    mediaGroup = [].concat.apply(mediaGroup, cardResult);
                } catch (err) {
                    const cardResult = [
                        {
                            type: 'photo',
                            media:
                                'https://mtgcardsmith.com/view/cards_ip/1536462447335512.png?t=891604',
                            caption: `Rakdos couldn't find anytning about ${card}`,
                        },
                    ];
                    mediaGroup = [].concat.apply(mediaGroup, cardResult);
                }
            }
            if (mediaGroup) {
                ctx.replyWithMediaGroup(mediaGroup);
            }
        }
    },
};

module.exports = {messageHandler};
