const Extra = require('telegraf/extra');
const ScryfallApi = require('../helpers/scryfall');
const RakdosCard = require('../models/rakdos/card');
const CardFaceResult = require('../models/rakdos/card-face-result');

const api = new ScryfallApi();

async function handleCallbackQuery(ctx) {
    // console.log(ctx.update);
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
            Extra.HTML().markup((m) => newCard.reply_markup)
        );
    }
}

module.exports = {handleCallbackQuery};
