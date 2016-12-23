import restify = require('restify');
import builder = require('botbuilder');

import Bot = require('./bot');

import config = require('./config');

const bot = new Bot();
bot.initializeForWeb();

console.log('Configuring web server...');
const server = restify.createServer();
server.post('/api/messages', (<builder.ChatConnector>bot.connector).listen());
server.listen(config.webServer.port, () => {
    console.log('The bot server is now running on port %s and is ready to recieve requests', config.webServer.port);
});
