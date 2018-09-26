import {Card} from 'interfaces/Card';
const Legality = {
    STANDARD: 'standard',
    FUTURE: 'future',
    FRONTIER: 'frontier',
    MODERN: 'modern',
    LEGACY: 'legacy',
    PAUPER: 'pauper',
    VINTAGE: 'vintage',
    PENNY: 'penny',
    COMMANDER: 'commander',
    VERSUS: '1v1',
    DUEL: 'duel',
    BRAWL: 'brawl',
    LEGAL: 'legal',
    NOT_LEGAL: 'not_legal',
    BANNED: 'banned',
    label: (legality: string): string => {
        const labels = {
            [Legality.STANDARD]: 'Standard',
            // [Legality.FUTURE]: 'Future',
            // [Legality.FRONTIER]: 'Frontier',
            [Legality.MODERN]: 'Modern',
            [Legality.LEGACY]: 'Legacy',
            // [Legality.PAUPER]: 'Pauper',
            // [Legality.VINTAGE]: 'Vintage',
            // [Legality.PENNY]: 'Penny',
            // [Legality.COMMANDER]: 'Commander',
            // [Legality.VERSUS]: 'Versus',
            // [Legality.DUEL]: 'Duel Commander',
            // [Legality.BRAWL]: 'Brawl',
            [Legality.LEGAL]: '✅',
            [Legality.NOT_LEGAL]: '⭕️',
            [Legality.BANNED]: '❌',
        };

        return labels[legality] ? labels[legality] : '';
    },
    buildLegalityText(card: Card, joiner = ' ') {
        return Object.entries(card.legality as object)
            .filter(
                (legality: [string, string]): boolean => {
                    const [name] = legality;
                    return Boolean(Legality.label(name));
                }
            )
            .map((legality: string[]) => {
                const [name, legal] = legality;
                return `${Legality.label(legal)} ${Legality.label(name)} `;
            })
            .join(joiner);
    },
};

export default Legality;
