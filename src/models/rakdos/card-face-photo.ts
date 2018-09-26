import {ScryfallCard} from 'interfaces/Scryfall';
import {CardFace} from 'interfaces/Card';

class CardFacePhoto {
    type?: string;
    media?: string;
    caption?: string;

    constructor(cardFace: CardFace | any, size = 'large') {
        const isCardObject = cardFace.constructor === Object;
        if (isCardObject) {
            this.buildPhoto(cardFace, size);
            return this;
        }
        this.build404(cardFace);
        return this;
    }

    buildPhoto(cardFace: CardFace, size: string): void {
        this.type = 'photo';
        this.media = cardFace.getImage(size);
        this.caption = `${cardFace.name}`;
    }

    build404(card: ScryfallCard): void {
        this.type = 'photo';
        this.media =
            'https=//mtgcardsmith.com/view/cards_ip/1536462447335512.png?t=891604';
        this.caption = `Rakdos couldn't find anytning about ${card}`;
    }
}

export default CardFacePhoto;
