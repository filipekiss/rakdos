import ScryfallApi from '../helpers/scryfall';
import RakdosCard from '../models/rakdos/card';
import RakdosQuery from '../helpers/rakdos-query';
import CardFacePhoto from '../models/rakdos/card-face-photo';
import {CardFace} from 'interfaces';

const api = new ScryfallApi();

async function findCards(card: string, imageSize: string) {
    const rakdosQuery = new RakdosQuery(card);
    try {
        const scryfallCard = await api.named({
            fuzzy: rakdosQuery.text,
            set: rakdosQuery.set || null,
        });
        const rakdosCard = new RakdosCard(scryfallCard);
        return rakdosCard.faces.map(
            (currentFace: CardFace) =>
                new CardFacePhoto(currentFace, imageSize),
        );
    } catch (err) {
        const cardResult = new CardFacePhoto(rakdosQuery.text);
        return [cardResult];
    }
}

const handler = async function(ctx: any) {
    const isPrivateChat =
        ctx.update.message.from.id === ctx.update.message.chat.id;
    if (!isPrivateChat) {
        return;
    }
    const messageText = ctx.update.message.text;
    const mediaGroup = await findCards(messageText, 'large');
    if (mediaGroup) {
        ctx.replyWithMediaGroup(mediaGroup);
    }
};

export default handler;
