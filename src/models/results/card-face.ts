import {Markup} from 'telegraf';
import {Card, CardFace} from 'interfaces';

function buildMessageContent(card: CardFace) {
    return {
        message_text: `<strong>${card.name}</strong> ${
            card.mana_cost
        }<a href="${card.getImage('large')}">&#8205;</a>`,
        parse_mode: 'HTML',
    };
}

function buildTransformButton(card: Card, currentFace: CardFace) {
    const buttonText = 'Transform ↺';
    let callbackData = '';
    card.faces.forEach((cardFace: CardFace, index: number) => {
        if (cardFace.name !== currentFace.name) {
            callbackData = `swap-face:${card.scryfall_id}:${index}`;
        }
    });
    const showTransformButton = !callbackData;
    return Markup.callbackButton(buttonText, callbackData, showTransformButton);
}

class CardFaceResult {
    type = 'article';
    id: string;
    title: string;
    description: string;
    thumb_url: string;
    reply_markup: object = {};
    input_message_content: {
        message_text: string;
    } = {
        message_text: '',
    };
    constructor(card: Card, cardFace: CardFace) {
        this.id = `rakdosbot--${card.set}${card.number}${cardFace.face}`;
        this.title = cardFace.name;
        this.description = cardFace.oracle;
        this.thumb_url = cardFace.getImage('art_crop');
        this.input_message_content = buildMessageContent(cardFace);
        const viewInScryfallButton = Markup.urlButton(
            'View In Scryfall',
            card.scryfall_uri,
            !card.scryfall_uri,
        );
        const tranformButton = buildTransformButton(card, cardFace);
        this.reply_markup = Markup.inlineKeyboard([
            [tranformButton],
            [viewInScryfallButton],
        ]);
    }
}

export default CardFaceResult;
