import {ScryfallCard, ScryfallCardFace, CardFace} from 'interfaces';

class Card {
    name: string;
    usd?: string;
    eur?: string;
    tix?: string;
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
        this.name = card.name;
        this.scryfall_id = card.id;
        this.set = card.set;
        this.scryfall_uri = card.scryfall_uri;
        this.number = card.collector_number;
        this.faces = this.buildFaces(card);
        this.legality = card.legalities;
        this.usd = card.usd ? card.usd : 'N/A';
        this.tix = card.tix ? card.tix : 'N/A';
        this.eur = card.eur ? card.eur : 'N/A';
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
        idx: number = 0
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

    setCardFace(card: ScryfallCard, idx = 0): string {
        if (card.object === 'card_face') {
            const faces = ['a', 'b'];
            return faces[idx];
        }
        return '';
    }

    buildManaCost(manaCost: string): string {
        return manaCost ? `(${manaCost.replace(/[{}]/g, '')})` : '';
    }

    getImage(face: string = '', size = 'large') {
        const firstFace = this.faces[0];
        if (this.type === this.TOKEN && firstFace.images[size]) {
            return this.images[size];
        }
        const cardImageUrl = `https://img.scryfall.com/cards/${size}/en/${
            this.set
        }/${this.number}${face}.jpg`;
        return cardImageUrl;
    }
}

export default Card;
