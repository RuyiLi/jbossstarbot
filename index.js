const TelegramBot = require('node-telegram-bot-api');
const { get } = require('snekfetch');

const token = '785539210:AAEyEgtWOLgqER4iuVmFucU5Hukt9UxsCaM';

const client = new TelegramBot(token, { polling: true });

client.onText(/\.stars (.+)/, async (msg, match) => {
    const name = match[1];
    const res = await get('https://api.github.com/orgs/JBossOutreach/repos');
    for(const r of res.body){
        if(r['name'] === name){
            return client.sendMessage(msg.chat.id, `The JBoss/${name} repository has ${r.stargazers_count} stars.`);
        }
    }
    client.sendMessage(msg.chat.id, 'Could not find that repository.');
})