class RakdosCard {
    constructor(card) {
        this.set = card.set;
        this.number = card.collector_number;
        this.faces = this.buildFaces(card);
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

// const buildArticleReturn = function(card) {
//     const cardImagesLarge = buildCardImage(card);
//     const cardImagesThumb = buildCardImage(card, 'art_crop');
//     const cardDetails = {
//         type: 'article',
//         id: `rakdosbot-${rakdosVersion}--${card.id}`,
//         title: card.name,
//         input_message_content: {
//             message_text: `<strong>${card.name}</strong> (${buildManaCost(
//                 card
//             )}) ${cardImagesLarge
//                 .map(
//                     (cardImage) =>
//                         `${cardImage} <a href="${cardImage}">&#8205;</a>`
//                 )
//                 .join('')}`,
//             parse_mode: 'HTML',
//         },
//         thumb_url: cardImagesThumb[0],
//         description: buildOracleText(card),
//         reply_markup: Markup.inlineKeyboard([
//             Markup.urlButton(
//                 'View In Scryfall',
//                 card.scryfall_uri,
//                 !card.scryfall_uri
//             ),
//             Markup.urlButton(
//                 'View In Gatherer',
//                 card.related_uris.gatherer,
//                 !card.related_uris.gatherer
//             ),
//         ]),
//     };
//     return cardDetails;
// }
// }
