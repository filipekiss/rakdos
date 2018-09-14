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
    label: (legality) => {
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
            [Legality.NOT_LEGAL]: '❌',
        };

        return labels[legality] ? labels[legality] : '';
    },
    buildLegalityText(card, joiner = ' ') {
        return Object.entries(card.legality)
            .filter((legality) => {
                const [name] = legality;
                return Boolean(Legality.label(name));
            })
            .map((legality) => {
                const [name, legal] = legality;
                return `${Legality.label(legal)} ${Legality.label(name)} `;
            })
            .join(joiner);
    },
};

module.exports = Legality;
