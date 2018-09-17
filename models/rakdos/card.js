class RakdosCard {
    constructor(card) {
        if (!card.set || !card.collector_number) {
            throw Error('Invalid Card Format', card);
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
    }

    buildFaces(card) {
        if (card.card_faces && card.image_uris) {
            const rakdosCard = this.buildSingleFace(card);
            rakdosCard.face = 'a';
            rakdosCard.getImage = this.getImage.bind(this, 'a');
            return [rakdosCard];
        }
        if (card.card_faces && !card.image_uris) {
            return card.card_faces.map(this.buildSingleFace, this);
        }
        return [this.buildSingleFace(card)];
    }

    buildSingleFace(cardFace, idx = 0) {
        const cardFaceId = this.setCardFace(cardFace, idx);
        return {
            oracle: cardFace.oracle_text,
            mana_cost: this.buildManaCost(cardFace.mana_cost),
            name: cardFace.name,
            face: cardFaceId,
            getImage: this.getImage.bind(this, cardFaceId),
        };
    }

    setCardFace(card, idx = 0) {
        if (card.object === 'card_face') {
            const faces = ['a', 'b'];
            return faces[idx];
        }
        return '';
    }

    buildManaCost(manaCost) {
        return manaCost ? `(${manaCost.replace(/[{}]/g, '')})` : '';
    }

    getImage(face = '', size = 'large') {
        const cardImageUrl = `https://img.scryfall.com/cards/${size}/en/${
            this.set
        }/${this.number}${face}.jpg`;
        return cardImageUrl;
    }
}

module.exports = RakdosCard;
