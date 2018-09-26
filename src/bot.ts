import Telegraf from 'telegraf';
import {inlineQueryHandler} from './handlers/inline-query';
import {messageHandler} from './handlers/incoming-message';
import {handleCallbackQuery} from './handlers/callback-query';

/*
 * We make this const assignment before the call to `new` because TypeScript
 * will complain Telegraf has no constructor signature
 */
const telegrafBot: any = Telegraf;
const bot = new telegrafBot(process.env.BOT_TOKEN, {username: 'RakdosBot'});
const CACHE_TIME = process.env.CACHE_TIME ? process.env.CACHE_TIME : 600;

bot.on(
    'inline_query',
    async ({
        inlineQuery,
        answerInlineQuery,
    }: {
        inlineQuery: any;
        answerInlineQuery: any;
    }) => {
        const articles = await inlineQueryHandler(inlineQuery);
        answerInlineQuery(articles, {
            cache_time: CACHE_TIME,
        });
    }
);

bot.start((ctx: any) =>
    ctx.replyWithHTML(`
Welcome to Rakdos! I'm a bot dedicated to finding M:tG card info for you. For instructions on how to use me, please, see https://github.com/filipekiss/rakdos#rakdos
`)
);

bot.help((ctx: any) =>
    ctx.replyWithHTML(`
For instructions on how to use me, please, see https://github.com/filipekiss/rakdos#rakdos
`)
);

bot.on('callback_query', handleCallbackQuery);

bot.hears(messageHandler.trigger, messageHandler.handler);

export default bot;
