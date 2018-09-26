import {Markup} from 'telegraf';
import {Card, CardFace} from 'interfaces/Card';
import {ArticleResult} from 'interfaces/Results';

function buildMessageContent(card: CardFace) {
    return {
        message_text: `<strong>${card.name}</strong> ${
            card.mana_cost
        }<a href="${card.getImage('art_crop')}">&#8205;</a>`,
        parse_mode: 'HTML',
    };
}

function buildTransformButton(card: Card, currentFace: CardFace) {
    const buttonText = 'Transform ↺';
    let callbackData = '';
    card.faces.forEach((cardFace: CardFace, index: number) => {
        if (cardFace.name !== currentFace.name) {
            callbackData = `swap-face-art:${card.scryfall_id}:${index}`;
        }
    });
    const showTransformButton = !callbackData;
    return Markup.callbackButton(buttonText, callbackData, showTransformButton);
}

class CardArtResult {
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
        this.type = 'article';
        this.id = `rakdosbot--${card.set}${card.number}${cardFace.face}-art`;
        this.title = cardFace.name;
        this.description = cardFace.oracle;
        this.thumb_url = cardFace.getImage('art_crop');
        this.input_message_content = buildMessageContent(cardFace);
        const tranformButton = buildTransformButton(card, cardFace);
        this.reply_markup = Markup.inlineKeyboard([[tranformButton]]);
    }
}

export default CardArtResult;
