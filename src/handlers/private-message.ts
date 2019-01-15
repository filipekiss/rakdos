import ScryfallApi from '../helpers/scryfall';
import RakdosCard from '../models/rakdos/card';
import RakdosQuery from '../helpers/rakdos-query';
import CardFacePhoto from '../models/rakdos/card-face-photo';
import Legality from '../helpers/constants/legality';
import Price from '../helpers/constants/price';
import {CardFace} from 'interfaces';

const api = new ScryfallApi();

const CARD_PATTERN = /\[\[((?:(?!\]\]).)+)\]\]/gm;

const runRegex = function(str: string, regex: RegExp) {
    const cards = [];
    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        cards.push(m[1]);
    }

    return cards;
};

const findCardsInString = function(str: string) {
    const regex = /\[\[([^!\#$](?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};

const findLegalities = function(str: string) {
    const regex = /\[\[#((?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};
const findPrices = function(str: string) {
    const regex = /\[\[\$((?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};
const findArts = function(str: string) {
    const regex = /\[\[!((?:(?!\]\]).)+)\]\]/gm;
    return runRegex(str, regex);
};

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
        return cardResult;
    }
}

const handler = async function(ctx: any) {
    const isPrivateChat =
        ctx.update.message.from.id === ctx.update.message.chat.id;
    if (!isPrivateChat) {
        return;
    }
    const messageText = ctx.update.message.text;
    let mediaGroup = await findCards(messageText, 'large');
    mediaGroup = [].concat.apply([], mediaGroup);
    if (mediaGroup) {
        ctx.replyWithMediaGroup(mediaGroup);
    }
};

export default handler;
