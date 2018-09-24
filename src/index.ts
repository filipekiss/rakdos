const express = require('express');
const rakdosBot = require('./bot');

const expressApp = express();

expressApp.use(rakdosBot.webhookCallback(`/bot/${process.env.BOT_TOKEN}`));
expressApp.get('/', (req, res) => {
    res.send(
        '<h1>Rakdos Bot - See <a href="https://github.com/filipekiss/rakdos">the github repo</a> for issues and suggestions</h1>'
    );
});
expressApp.get('/set-hook', (req, res) => {
    const fullUrl = `https://${req.get('host')}`;
    rakdosBot.telegram.setWebhook(`${fullUrl}/bot/${process.env.BOT_TOKEN}`);
    res.send(`WebHook set to ${fullUrl}/bot/:token`);
});
expressApp.listen(3000);
