const Legality = require('../../helpers/constants/legality');

function buildLegalityText(card, joiner = ' ') {
    return Object.entries(card.legality)
        .filter((legality) => {
            const [name] = legality;
            return Boolean(Legality.label(name));
        })
        .map((legality) => {
            const [name, legal] = legality;
            return `${Legality.label(legal)} ${Legality.label(name)} `;
        })
        .join(joiner);
}

function buildMessageContent(card) {
    return {
        message_text: `<strong>${card.name}</strong>
${buildLegalityText(card, '\n')}`,
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
        faceResult.description = buildLegalityText(card);
        faceResult.thumb_url = cardFace.getImage('art_crop');
        faceResult.input_message_content = buildMessageContent(card);
        return faceResult;
    }
}

module.exports = CardLegalityResult;
