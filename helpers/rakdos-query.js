const sets = require('./sets.json');

class RakdosQuery {
    static get TOKEN() {
        return 'token';
    }

    constructor(queryString) {
        this.originalString = queryString;
        this.isPrice = false;
        this.isArt = false;
        this.isLegality = false;
        this.isToken = false;
        let query = this.parseModifiers(queryString);
        query = this.parseSet(query);
        query = this.parseToken(query);
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

    parseToken(string) {
        const debug = (item) => console.log(item) || item;
        return string
            .split(' ')
            .map(debug)
            .filter((segment) => {
                const isToken = segment.toLowerCase() === RakdosQuery.TOKEN;
                console.log(segment.toLowerCase());
                console.log(RakdosQuery.TOKEN);
                console.log(isToken);
                if (isToken) {
                    this.isToken = isToken;
                    if (this.set) {
                        this.set = `t${this.set}`;
                    }
                    return false;
                }
                return true;
            })
            .map(debug)
            .join(' ');
    }
}

module.exports = RakdosQuery;
