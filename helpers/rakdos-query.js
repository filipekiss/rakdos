const sets = require('./sets.json');

class RakdosQuery {
    constructor(queryString) {
        this.originalString = queryString;
        this.isPrice = false;
        this.isArt = false;
        this.isLegality = false;
        let query = this.parseModifiers(queryString);
        query = this.parseSet(query);
        this.text = query;
    }

    parseModifiers(string) {
        // Parse modifiers like $ for price and # for legality
        return string
            .split(' ')
            .map((segment) => {
                let currentSegment = segment;
                if (currentSegment.slice(0, 1) === '$') {
                    this.isPrice = true;
                    currentSegment = currentSegment.slice(1);
                }
                if (currentSegment.slice(0, 1) === '#') {
                    this.isLegality = true;
                    currentSegment = currentSegment.slice(1);
                }
                if (currentSegment.slice(0, 1) === '!') {
                    this.isArt = true;
                    currentSegment = currentSegment.slice(1);
                }
                return currentSegment;
            })
            .join(' ');
    }

    parseSet(string) {
        return string
            .split('|')
            .filter((segment) => {
                const setCode = segment.toLowerCase().trim();
                if (sets[setCode]) {
                    this.set = setCode;
                    return false;
                }
                return true;
            })
            .join(' ');
    }
}

module.exports = RakdosQuery;
