const Legality = require('../../helpers/constants/legality');

function buildMessageContent(card) {
    return {
        message_text: `<strong>${card.name}</strong>
${Legality.buildLegalityText(card, '\n')}`,
        parse_mode: 'HTML',
    };
}

class CardLegalityResult {
    constructor(card, cardFace) {
        const faceResult = {};
        faceResult.type = 'article';
        faceResult.id = `rakdosbot--${card.set}${card.number}${
            cardFace.face
        }-legality`;
        faceResult.title = cardFace.name;
        faceResult.description = Legality.buildLegalityText(card);
        faceResult.thumb_url = cardFace.getImage('art_crop');
        faceResult.input_message_content = buildMessageContent(card);
        return faceResult;
    }
}

module.exports = CardLegalityResult;
