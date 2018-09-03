const queryString = require('query-string');
const fetch = require('node-fetch');
const URL = require('url').Url;

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

    async named(params = {}) {
        if (!params) {
            throw new Error('No Query Passed');
        }
        const requestUrl = this.buildRequestUrl(
            this.scryfallApi.cards.named,
            params
        );
        console.log(requestUrl);
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

    buildRequestUrl(url = '/', params) {
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
