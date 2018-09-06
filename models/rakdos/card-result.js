class CardResult {
    static buildArticle(card) {
        const faceResult = {};
        faceResult.type = 'article';
        faceResult.id = `rakdosbot--${card.set}${card.number}${card.face}`;
        faceResult.title = card.name;
        faceResult.description = card.oracle;
        faceResult.thumb_url = card.getImage('art_crop');
        faceResult.input_message_content = CardResult.buildMessageContent(card);
        return faceResult;
    }

    static buildMessageContent(card) {
        return {
            message_text: `<strong>${card.name}</strong> ${
                card.mana_cost
            }<a href="${card.getImage('large')}">&#8205;</a>`,
            parse_mode: 'HTML',
        };
    }
}

module.exports = CardResult;

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
