import {ScryfallCard, ScryfallCardFace, CardFace} from 'interfaces';
import {ScryfallCardPrices} from 'interfaces/Scryfall/ScryfallCard';

function getPriceFromCard(card: ScryfallCard) {
    return (priceKey: keyof ScryfallCardPrices) => {
        return card.prices[priceKey] ? card.prices[priceKey] : 'N/A';
    };
}

class Card {
    name: string;
    prices: ScryfallCardPrices;
    faces: CardFace[];
    set?: string;
    number?: number;
    scryfall_uri?: string;
    scryfall_id?: string;
    legality?: {
        [legality: string]: string;
    };
    type?: string;
    TOKEN?: string;
    images: {
        [size: string]: string;
    };

    static get TOKEN(): string {
        return 'token';
    }

    constructor(card: ScryfallCard) {
        if (!card.set || !card.collector_number) {
            throw Error('Invalid Card Format');
        }
        const getPriceIn = getPriceFromCard(card);
        this.name = card.name;
        this.scryfall_id = card.id;
        this.set = card.set;
        this.scryfall_uri = card.scryfall_uri;
        this.number = card.collector_number;
        this.faces = this.buildFaces(card);
        this.legality = card.legalities;
        this.prices = {
            usd: getPriceIn('usd'),
            usd_foil: getPriceIn('usd_foil'),
            tix: getPriceIn('tix'),
            eur: getPriceIn('eur'),
        };
        this.type = card.layout;
        this.images = {};
    }

    buildFaces(card: ScryfallCard): CardFace[] {
        if (card.card_faces && card.image_uris) {
            const rakdosCard: CardFace = this.buildSingleFace(card);
            rakdosCard.face = 'a';
            rakdosCard.getImage = this.getImage.bind(this, 'a');
            return [rakdosCard];
        }
        if (card.card_faces && !card.image_uris) {
            return card.card_faces.map(this.buildSingleFace, this);
        }
        return [this.buildSingleFace(card)];
    }

    buildSingleFace(
        cardFace: ScryfallCard | ScryfallCardFace,
        idx: number = 0,
    ): CardFace {
        const cardFaceId = this.setCardFace(cardFace, idx);
        return {
            oracle: cardFace.oracle_text,
            mana_cost: this.buildManaCost(cardFace.mana_cost),
            name: cardFace.name,
            face: cardFaceId,
            getImage: this.getImage.bind(this, cardFaceId),
            images: cardFace.image_uris,
        };
    }

    setCardFace(card: ScryfallCard, idx = 0): '' | 'a' | 'b' {
        if (card.object === 'card_face') {
            const faces: ['a', 'b'] = ['a', 'b'];
            return faces[idx];
        }
        return '';
    }

    getFaceIndex(faceLabel: '' | 'a' | 'b' = 'a') {
        const faces: {
            a: number;
            b: number;
        } = {
            a: 0,
            b: 1,
        };
        return faces[faceLabel] ? faces[faceLabel] : 0;
    }

    buildManaCost(manaCost: string): string {
        return manaCost ? `(${manaCost.replace(/[{}]/g, '')})` : '';
    }

    getImage(face: '' | 'a' | 'b' = 'a', size = 'large') {
        const firstFace = this.faces[0];
        if (this.type === this.TOKEN && firstFace.images[size]) {
            return this.images[size];
        }
        const faceIndex = this.getFaceIndex(face);
        const cardFace = this.faces[faceIndex];
        const cardImageUrl = new URL(cardFace.images[size]);
        cardImageUrl.search = ''; // Ensure no query string params are passed
        return cardImageUrl.href;
    }
}

export default Card;
