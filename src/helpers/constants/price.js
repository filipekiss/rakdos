const Price = {
    buildPriceTags(card) {
        return `💵 ${card.usd} | 💶 ${card.eur} | 🎟 ${card.tix}`;
    },
};
module.exports = Price;
