import Card from 'interfaces/Card/Card';

const Price = {
    buildPriceTags(card: Card) {
        return `💵 ${card.usd} | 💶 ${card.eur} | 🎟 ${card.tix}`;
    },
};

export default Price;
export {Price};
