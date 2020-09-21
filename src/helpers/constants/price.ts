import {Card} from 'interfaces';

const Price = {
    buildPriceTags(card: Card) {
        return `💵 ${card.prices.usd} | ✨ ${card.prices.usd_foil} | 💶 ${
            card.prices.eur
        } | 🎟 ${card.prices.tix}`;
    },
};

export default Price;
export {Price};
