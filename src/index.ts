import express from 'express';
import {Request, Response} from 'express';
import rakdosBot from './bot';

const expressApp = express();

expressApp.use(rakdosBot.webhookCallback(`/bot/${process.env.BOT_TOKEN}`));
expressApp.get('/', (req: Request, res: Response) => {
    res.send(
        '<h1>Rakdos Bot - See <a href="https://github.com/filipekiss/rakdos">the github repo</a> for issues and suggestions</h1>'
    );
});
expressApp.get('/set-hook', (req: Request, res: Response) => {
    const fullUrl: string = `https://${req.get('host')}`;
    rakdosBot.telegram.setWebhook(`${fullUrl}/bot/${process.env.BOT_TOKEN}`);
    res.send(`WebHook set to ${fullUrl}/bot/:token`);
});
expressApp.listen(3000);
