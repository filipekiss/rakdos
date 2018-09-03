const queryString = require('query-string');
const fetch = require('node-fetch');
const {placeholder} = require('./helpers/string');

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
    }

    async search(params = {}) {
        if (!params) {
            throw new Error('No Query Passed');
        }
        const requestUrl = this.buildRequestUrl(
            this.scryfallApi.cards.search,
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
            if (result.oracle_text) {
                return result.oracle_text;
            }
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
