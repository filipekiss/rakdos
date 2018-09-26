import {Card, CardFace} from 'interfaces/Card';
import {ArticleResult} from 'interfaces/Results';
import Price from 'helpers/constants/price';

function buildMessageContent(card: Card) {
    return {
        message_text: `<strong>${card.name}</strong><pre>
${Price.buildPriceTags(card)}</pre>`,
        parse_mode: 'HTML',
    };
}

class CardPriceResult {
    constructor(card: Card, cardFace: CardFace) {
        const faceResult: ArticleResult = {};
        faceResult.type = 'article';
        faceResult.id = `rakdosbot--${card.set}${card.number}${
            cardFace.face
        }-price`;
        faceResult.title = cardFace.name;
        faceResult.description = Price.buildPriceTags(card);
        faceResult.thumb_url = cardFace.getImage('art_crop');
        faceResult.input_message_content = buildMessageContent(card);
        return faceResult;
    }
}

export default CardPriceResult
