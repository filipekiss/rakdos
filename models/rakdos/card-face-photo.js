class CardFacePhoto {
    constructor(cardFace) {
        const isCardObject = cardFace.constructor === Object;
        if (isCardObject) {
            return this.buildPhoto(cardFace);
        }
        return this.build404(cardFace);
    }

    buildPhoto(cardFace) {
        return {
            type: 'photo',
            media: cardFace.getImage('large'),
            caption: `${cardFace.name}`,
        };
    }

    build404(card) {
        return {
            type: 'photo',
            media:
                'https://mtgcardsmith.com/view/cards_ip/1536462447335512.png?t=891604',
            caption: `Rakdos couldn't find anytning about ${card}`,
        };
    }
}

module.exports = CardFacePhoto;
