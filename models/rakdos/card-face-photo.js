class CardFacePhoto {
    constructor(cardFace, size = 'large') {
        const isCardObject = cardFace.constructor === Object;
        if (isCardObject) {
            return this.buildPhoto(cardFace, size);
        }
        return this.build404(cardFace);
    }

    buildPhoto(cardFace, size) {
        return {
            type: 'photo',
            media: cardFace.getImage(size),
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
