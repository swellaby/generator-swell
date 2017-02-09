'use strict';

/**
 * Manages console interaction
 */

// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* tslint:disable:no-single-line-block-comment JSHint and ESLint need single line block comments */
/* jshint quotmark:false */
/* eslint-disable quotes */
import Bot = require('./bot');
/* eslint-enable quotes */
/* jshint quotmark:true */
/* tslint:enable:no-single-line-block-comment */

const bot = new Bot();
bot.initializeForConsole();
bot.connector.listen();
console.log('Bot listening, type a message to begin...');
