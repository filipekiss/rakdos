const Markup = require('telegraf/markup');

function buildMessageContent(card) {
    return {
        message_text: `<strong>${card.name}</strong> ${
            card.mana_cost
        }<a href="${card.getImage('art_crop')}">&#8205;</a>`,
        parse_mode: 'HTML',
    };
}

function buildTransformButton(card, currentFace) {
    const buttonText = 'Transform ↺';
    let callbackData = '';
    card.faces.forEach((cardFace, index) => {
        if (cardFace.name !== currentFace.name) {
            callbackData = `swap-face-art:${card.scryfall_id}:${index}`;
        }
    });
    const showTransformButton = !callbackData;
    return Markup.callbackButton(buttonText, callbackData, showTransformButton);
}

class CardArtResult {
    constructor(card, cardFace) {
        const faceResult = {};
        faceResult.type = 'article';
        faceResult.id = `rakdosbot--${card.set}${card.number}${
            cardFace.face
        }-art`;
        faceResult.title = cardFace.name;
        faceResult.description = cardFace.oracle;
        faceResult.thumb_url = cardFace.getImage('art_crop');
        faceResult.input_message_content = buildMessageContent(cardFace);
        const tranformButton = buildTransformButton(card, cardFace);
        faceResult.reply_markup = Markup.inlineKeyboard([[tranformButton]]);
        return faceResult;
    }
}

module.exports = CardArtResult;
