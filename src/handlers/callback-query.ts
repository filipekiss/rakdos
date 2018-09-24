const Extra = require('telegraf/extra');
const ScryfallApi = require('../helpers/scryfall');
const RakdosCard = require('../models/rakdos/card');
const CardFaceResult = require('../models/results/card-face');
const CardArtResult = require('../models/results/card-art');

const api = new ScryfallApi();

async function handleCallbackQuery(ctx) {
    const [action, cardId, cardFace] = ctx.update.callback_query.data.split(
        ':'
    );
    if (action === 'swap-face') {
        const cardResult = await api.getCard(cardId);
        const rakdosCard = new RakdosCard(cardResult);
        const newCard = new CardFaceResult(
            rakdosCard,
            rakdosCard.faces[cardFace]
        );
        ctx.editMessageText(
            newCard.input_message_content.message_text,
            Extra.HTML().markup(() => newCard.reply_markup)
        );
    }
    if (action === 'swap-face-art') {
        const cardResult = await api.getCard(cardId);
        const rakdosCard = new RakdosCard(cardResult);
        const newCard = new CardArtResult(
            rakdosCard,
            rakdosCard.faces[cardFace]
        );
        ctx.editMessageMedia(
            newCard,
            Extra.HTML().markup(() => newCard.reply_markup)
        );
    }
}

module.exports = {handleCallbackQuery};
