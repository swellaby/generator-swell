import Bot = require('./bot');

const bot = new Bot();
bot.initializeForConsole();
bot.connector.listen();
console.log('Bot listening, type a message to begin...');
