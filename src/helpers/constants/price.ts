import {Card} from 'interfaces';

const Price = {
    buildPriceTags(card: Card) {
        return `💵 ${card.usd} | 💶 ${card.eur} | 🎟 ${card.tix}`;
    },
};

export default Price;
export {Price};
