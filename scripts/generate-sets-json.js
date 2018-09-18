// How to use: run node <path-to-this-script> > sets.json
const ScryfallApi = require('../helpers/scryfall');

const api = new ScryfallApi();
console.log('Fetching sets from Scryfall…');
api.sets().then((results) => {
    const sets = results.data;
    console.log('{');
    console.log(sets.map((set) => `"${set.code}": "${set.name}"`).join(',\n'));
    console.log('}');
});
