function buildPriceTags(card) {
    return `💵 ${card.usd} | 💶 ${card.eur} | 🎟 ${card.tix}`;
}
function buildMessageContent(card) {
    return {
        message_text: `<strong>${card.name}</strong><pre>
${buildPriceTags(card)}</pre>`,
        parse_mode: 'HTML',
    };
}

class CardPriceResult {
    constructor(card, cardFace) {
        const faceResult = {};
        faceResult.type = 'article';
        faceResult.id = `rakdosbot--${card.set}${card.number}${
            cardFace.face
        }-price`;
        faceResult.title = cardFace.name;
        faceResult.description = buildPriceTags(card);
        faceResult.thumb_url = cardFace.getImage('art_crop');
        faceResult.input_message_content = buildMessageContent(card);
        return faceResult;
    }
}

module.exports = CardPriceResult;
