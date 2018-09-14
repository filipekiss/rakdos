class RakdosQuery {
    constructor(queryString) {
        this.text = '';
        this.originalString = queryString;
        this.isPrice = false;
        this.isArt = false;
        this.isLegality = false;
        this.parseString(queryString);
    }

    parseString(string) {
        string.split(' ').forEach((segment) => {
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
            this.text = `${this.text} ${currentSegment}`;
        });
    }
}

module.exports = RakdosQuery;
