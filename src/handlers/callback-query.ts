import Telegraf from 'telegraf';
import ScryfallApi from '../helpers/scryfall';
import RakdosCard from '../models/rakdos/card';
import CardFaceResult from '../models/results/card-face';
import CardArtResult from '../models/results/card-art';
import {Extra} from 'telegraf';

const api = new ScryfallApi();
// const Extra = Telegraf.Extra;

async function handleCallbackQuery(ctx: any) {
    const [action, cardId, cardFace] = ctx.update.callback_query.data.split(
        ':'
    );
    const cardResult = await api.getCard(cardId);
    const rakdosCard = new RakdosCard(cardResult);
    if (action === 'swap-face') {
        const newCard = new CardFaceResult(
            rakdosCard,
            rakdosCard.faces[parseInt(cardFace)]
        );
        ctx.editMessageText(
            newCard.input_message_content.message_text,
            Extra.HTML().markup(() => newCard.reply_markup)
        );
    }
    if (action === 'swap-face-art') {
        const newCard = new CardArtResult(
            rakdosCard,
            rakdosCard.faces[parseInt(cardFace)]
        );
        ctx.editMessageText(
            newCard.input_message_content.message_text,
            Extra.HTML().markup(() => newCard.reply_markup)
        );
    }
}

export {handleCallbackQuery};
