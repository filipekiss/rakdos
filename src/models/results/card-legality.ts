import {Card, CardFace, ArticleResult} from 'interfaces';
import Legality from 'helpers/constants/legality';

function buildMessageContent(card: Card) {
    return {
        message_text: `<strong>${
            card.name
        }</strong>\n${Legality.buildLegalityText(
            card,
            '\n',
        )}\n<b>Legend</b>\n✅ <b>Legal</b> ⭕️ <b>Not Legal</b> ❌ <b>Restricted</b> 🚫 <b>Banned</b>`,
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
