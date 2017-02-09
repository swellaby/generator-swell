'use strict';

/**
 * Initializes the server
 */

// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* tslint:disable:no-single-line-block-comment JSHint and ESLint need single line block comments */
/* jshint quotmark:false */
/* eslint-disable quotes */
import restify = require('restify');
import builder = require('botbuilder');
import Bot = require('./bot');
import config = require('./config');
/* eslint-enable quotes */
/* jshint quotmark:true */
/* tslint:enable:no-single-line-block-comment */

const bot = new Bot();
bot.initializeForWeb();

console.log('Configuring web server...');
const server = restify.createServer();
server.post('/api/messages', (<builder.ChatConnector>bot.connector).listen());
server.listen(config.webServer.port, () => {
    console.log('The bot server is now running on port %s and is ready to recieve requests', config.webServer.port);
});
