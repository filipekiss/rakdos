import Telegraf from 'telegraf';
import Stage from 'telegraf/stage';
import session from 'telegraf/session';
import {inlineQueryHandler} from './handlers/inline-query';
import {messageHandler} from './handlers/incoming-message';
import {handleCallbackQuery} from './handlers/callback-query';
import handlePrivateMessage from './handlers/private-message';
import expandStage from './scenes/expand';
import {RAKDOS_TOKEN, getEnvironmentVar} from './env';
const {enter} = Stage;

/*
 * We make this const assignment before the call to `new` because TypeScript
 * will complain Telegraf has no constructor signature
 */
const telegrafBot: any = Telegraf;
const bot = new telegrafBot(RAKDOS_TOKEN, {username: 'RakdosBot'});
const CACHE_TIME = Number(getEnvironmentVar('RAKDOS_CACHE_TIME', 600));

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
    },
);

bot.start((ctx: any) =>
    ctx.replyWithHTML(`
Welcome to Rakdos! I'm a bot dedicated to finding M:tG card info for you. For instructions on how to use me, please, see https://github.com/filipekiss/rakdos#rakdos
`),
);

bot.help((ctx: any) =>
    ctx.replyWithHTML(`
For instructions on how to use me, please, see https://github.com/filipekiss/rakdos#rakdos
`),
);

bot.on('callback_query', handleCallbackQuery);

bot.hears(messageHandler.trigger, messageHandler.handler);
bot.on('message', handlePrivateMessage);

bot.command('sets', (ctx: any) => {
    ctx.replyWithHTML(
        'To see the set codes <a href="https://github.com/filipekiss/rakdos/wiki/Sets">click here</a>',
    );
});

// STage test
bot.use(session());
bot.use(expandStage.middleware());
bot.command('expand', enter('expand'));

export default bot;
