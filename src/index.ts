import express from 'express';
import {Request, Response} from 'express';
import rakdosBot from './bot';
import {SERVER_PORT, RAKDOS_TOKEN} from './env';

const expressApp = express();

expressApp.use(rakdosBot.webhookCallback(`/bot/${RAKDOS_TOKEN}`));
expressApp.get('/', (_req: Request, res: Response) => {
    res.send(
        '<h1>Rakdos Bot - See <a href="https://github.com/filipekiss/rakdos">the github repo</a> for issues and suggestions</h1>',
    );
});
expressApp.get('/set-hook', (req: Request, res: Response) => {
    const fullUrl: string = `https://${req.get('host')}`;
    rakdosBot.telegram.setWebhook(`${fullUrl}/bot/${RAKDOS_TOKEN}`);
    res.send(`WebHook set to ${fullUrl}/bot/:token`);
});
expressApp.listen(SERVER_PORT);
