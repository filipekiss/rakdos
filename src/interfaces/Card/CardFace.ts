export default interface CardFace {
    name: string;
    face: string;
    oracle: string;
    mana_cost: string;
    images: {
        [size: string]: string;
    };
    getImage(size: string): string;
}
