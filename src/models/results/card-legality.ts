import {Card, CardFace} from 'interfaces/Card';
import {ArticleResult} from 'interfaces/Results';
import Legality from 'helpers/constants/legality';

function buildMessageContent(card: Card) {
    return {
        message_text: `<strong>${card.name}</strong>
${Legality.buildLegalityText(card, '\n')}`,
        parse_mode: 'HTML',
    };
}

class CardLegalityResult {
    constructor(card: Card, cardFace: CardFace) {
        const faceResult: ArticleResult = {};
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

export default CardLegalityResult;
