const Markup = require('telegraf/markup');

function buildMessageContent(card) {
    return {
        message_text: `<strong>${card.name}</strong> ${
            card.mana_cost
        }<a href="${card.getImage('large')}">&#8205;</a>`,
        parse_mode: 'HTML',
    };
}

class CardFaceResult {
    constructor(card, cardFace) {
        const faceResult = {};
        faceResult.type = 'article';
        faceResult.id = `rakdosbot--${card.set}${card.collector_number}${
            cardFace.face
        }`;
        faceResult.title = cardFace.name;
        faceResult.description = cardFace.oracle;
        faceResult.thumb_url = cardFace.getImage('art_crop');
        faceResult.input_message_content = buildMessageContent(cardFace);
        faceResult.reply_markup = Markup.inlineKeyboard([
            Markup.urlButton(
                'View In Scryfall',
                card.scryfall_uri,
                !card.scryfall_uri
            ),
        ]);
        return faceResult;
    }
}

module.exports = CardFaceResult;
