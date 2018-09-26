const sets = require('static/sets.json');
const api = require('helpers/scryfall');

class RakdosQuery {
    originalString: string = '';
    isPrice: boolean = false;
    isArt: boolean = false;
    isLegality: boolean = false;
    isToken: boolean = false;
    text: string = '';
    set: string | null = null;

    static get TOKEN() {
        return 'token';
    }

    constructor(queryString: string) {
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

    parseModifiers(string: string): string {
        // Parse modifiers like $ for price and # for legality
        return string
            .split(' ')
            .map(
                (segment: string): string => {
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
                }
            )
            .join(' ');
    }

    parseSet(string: string): string {
        return string
            .split('|')
            .filter(
                (segment: string): boolean => {
                    const setCode = segment.toLowerCase().trim();
                    if (sets[setCode]) {
                        this.set = setCode;
                        return false;
                    }
                    return true;
                }
            )
            .join(' ');
    }

    parseToken(string: string): string {
        return string
            .split(' ')
            .filter(
                (segment: string): boolean => {
                    const isToken = segment.toLowerCase() === RakdosQuery.TOKEN;
                    if (isToken) {
                        this.isToken = isToken;
                        if (this.set) {
                            this.set = `t${this.set}`;
                        }
                        return false;
                    }
                    return true;
                }
            )
            .join(' ');
    }
}

export default RakdosQuery;
