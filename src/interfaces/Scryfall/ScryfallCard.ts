import ScryfallCardFace from './ScryfallCardFace';

export interface ScryfallCardPrices {
    usd: string;
    usd_foil: string;
    eur: string;
    tix: string;
}

export default interface ScryfallCard {
    id: string;
    collector_number: number;
    name: string;
    scryfall_uri: string;
    set: string;
    prices: ScryfallCardPrices;
    card_faces?: ScryfallCardFace[];
    image_uris: {
        [size: string]: string;
    };
    legalities: {
        [legality: string]: string;
    };
    layout: string;
    oracle_text: string;
    mana_cost: string;
    object: string;
}
