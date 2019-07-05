import {CardFace, ScryfallCard} from 'interfaces';

class CardFacePhoto {
    type: string = 'photo';
    media: string = '';
    caption: string = '';

    constructor(cardFace: CardFace | any, size = 'large') {
        const isCardObject = cardFace.constructor === Object;
        if (isCardObject && cardFace.name === 'Llanowar Tribe') {
            const tribeFactor = Math.floor(Math.random() * 100) > 95;
            if (tribeFactor) {
                this.buildLlanotribe(cardFace, size);
                return this;
            }
        }
        if (isCardObject) {
            this.buildPhoto(cardFace, size);
            return this;
        }
        this.build404(cardFace);
        return this;
    }

    buildPhoto(cardFace: CardFace, size: string): void {
        this.media = cardFace.getImage(size);
        this.caption = `${cardFace.name}`;
    }

    buildLlanotribe(cardFace: CardFace, size: string): void {
        this.media = 'https://i.imgur.com/GjWXl9S.png';
        this.caption = '3 Fucking Llanowar Elves';
    }

    build404(card: ScryfallCard): void {
        this.media =
            'https=//mtgcardsmith.com/view/cards_ip/1536462447335512.png?t=891604';
        this.caption = `Rakdos couldn't find anytning about ${card}`;
    }
}

export default CardFacePhoto;
