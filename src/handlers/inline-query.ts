import {InlineQuery} from 'telegram-typings';
import RakdosCard from 'models/rakdos/card';
import ScryfallApi from 'helpers/scryfall';
import CardFaceResult from 'models/results/card-face';
import CardPriceResult from 'models/results/card-price';
import CardLegalityResult from 'models/results/card-legality';
import CardArtResult from 'models/results/card-art';
import RakdosQuery from 'helpers/rakdos-query';
import {ArticleResult, ScryfallCard, ScryfallResult} from 'interfaces';

const api = new ScryfallApi();

async function search(rakdosQuery: RakdosQuery) {
    let scryfallQuery = rakdosQuery.text;
    if (rakdosQuery.set) {
        scryfallQuery = `${scryfallQuery} e:${rakdosQuery.set}`;
    }
    const results: ScryfallResult = await api.search({
        q: scryfallQuery,
        include_extras: true,
    });
    let articles = [] as ArticleResult[];
    if (results.data) {
        results.data.forEach((card: ScryfallCard) => {
            const rakdosCard = new RakdosCard(card);
            const cardResult = rakdosCard.faces.map((cardFace) => {
                if (rakdosQuery.isPrice) {
                    return new CardPriceResult(
                        rakdosCard,
                        cardFace,
                    ) as ArticleResult;
                }
                if (rakdosQuery.isLegality) {
                    return new CardLegalityResult(
                        rakdosCard,
                        cardFace,
                    ) as ArticleResult;
                }
                if (rakdosQuery.isArt) {
                    return new CardArtResult(
                        rakdosCard,
                        cardFace,
                    ) as ArticleResult;
                }
                return new CardFaceResult(
                    rakdosCard,
                    cardFace,
                ) as ArticleResult;
            });
            articles.concat(cardResult);
        });
    }
    return articles;
}

async function inlineQueryHandler(inlineQuery: InlineQuery) {
    if (!inlineQuery.query) {
        return null;
    }
    const rq = new RakdosQuery(inlineQuery.query);
    const results = await search(rq);
    return results;
}

export {inlineQueryHandler};
