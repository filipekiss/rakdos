import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import nicknames from 'static/nicknames.json';
import {plainText} from 'helpers/string';
const {enter, leave} = Stage;

const sceneName = 'expand';
const expandScene = new Scene(sceneName);
expandScene.enter((ctx) => {
    ctx.reply('Send me the cards nicknames you wish to expand');
});

expandScene.on('text', async (ctx) => {
    console.log(ctx.scene.scenes.get('expand'));
    await ctx.reply(plainText(ctx.update.message.text, nicknames));
    ctx.scene.leave(sceneName);
});

const expandNicknames = (text, nicknames) => {};

const expandStage = new Stage([expandScene]);

export default expandStage;
