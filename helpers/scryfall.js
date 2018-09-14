const queryString = require('query-string');
const fetch = require('node-fetch');
const {placeholder} = require('./string');

class ScryfallApi {
    constructor() {
        this.scryfallApi = {
            root: 'https://api.scryfall.com',
            cards: {
                root: '/cards',
                search: '/cards/search',
                named: '/cards/named',
                autocomplete: '/cards/autocomplete',
                random: '/cards/random',
                collection: '/cards/collection',
                multiverse: '/cards/multiverse/:id',
                mtgo: '/cards/mtgo/:id',
                arena: '/cards/arena/:id',
                single: '/cards/:id',
            },
        };
        this.sort = {
            order: 'released',
            dir: 'auto',
        };
    }

    async search(params = {}) {
        if (!params) {
            throw new Error('No Query Passed');
        }
        const searchParams = {...params};
        if (!searchParams.order) {
            searchParams.order = this.sort.order;
        }
        if (!searchParams.dir) {
            searchParams.dir = this.sort.dir;
        }
        const requestUrl = this.buildRequestUrl(
            this.scryfallApi.cards.search,
            searchParams
        );
        const results = await this.parsedSearchResults(requestUrl);
        if (results.data && results.data.length > 50) {
            results.data = results.data.slice(0, 50);
        }
        return results;
    }

    async named(params = {}) {
        if (!params) {
            throw new Error('No Query Passed');
        }
        const requestUrl = this.buildRequestUrl(
            this.scryfallApi.cards.named,
            params
        );
        const results = await this.parsedSearchResults(requestUrl);
        return results;
    }

    async getCard(id = null) {
        if (id) {
            const requestUrl = this.buildRequestUrl(
                this.scryfallApi.cards.single,
                {id}
            );
            const result = await this.parsedSearchResults(requestUrl);
            return result;
        }
    }

    buildRequestUrl(url = '/', params) {
        if (url.indexOf(':') !== -1) {
            url = placeholder(url, params);
        }
        const apiLocation = new URL(url, this.scryfallApi.root);
        const search = queryString.stringify(params);
        apiLocation.search = search;
        return apiLocation;
    }

    async parsedSearchResults(searchUrl = null) {
        const response = await fetch(searchUrl.href);
        const body = await response.json();
        return body;
    }
}

module.exports = ScryfallApi;
