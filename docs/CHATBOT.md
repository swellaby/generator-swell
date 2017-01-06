# Chatbot  

The scaffolding assumes you want to use the [Microsoft Bot Framework][bot-framework] and [LUIS][luis].
You can read a full guide on how to build a chatbot using this generator [here][blog-post].

## Standard Files  

The chatbot scaffolding includes all the same files/structure in the [boilerplate docs][boilerplate-building-section].  
It also includes the following additions/changes:  

* [src/bot.ts][bot.ts] - This is main class. The purpose of this class is to configure the bot. It sets defaults, registers dialogs to paths, and binds intents to paths. The class provided by the scaffolding assumes that you are planning on using LUIS for your intent engine.
* [src/config.ts][config.ts] - This file is used for configuration of the app.  
* [src/console.ts][console.ts] - This script starts the bot for interaction over the console. This would only happen in dev scenarios.   
* [src/server.ts][server.ts] - This script starts the bot for interaction using a web server. The scaffolding chooses restify (which is very similar to express).  
* [src/dialogs/dialog-base.ts][dialog-base.ts] - All dialogs will inherit from this class, it provides the base property and method that we we use to bind dialogs to paths.
* [src/dialogs/sample.ts][sample.ts] - This is an extremely simple dialog that tells the chatter what their favorite food is.  
* [test/unit/bot-tests.ts][bot-tests.ts] - This includes unit tests for [bot.ts][bot.ts].  

## Building  

The chatbot leverages the same gulp tasks defined in the [boilerplate docs][boilerplate-building-section].

## Testing  

The chatbot leverages the same testing configuration defined in the [boilerplate docs][boilerplate-testing-section].  
The scaffolding provides [these tests][bot-tests.ts] for the [bot.ts][bot.ts]. These tests provide a good example on how to use sinon stubs with mocha and chai.  

## Run  

You can run the bot 2 ways:  
* Server Mode - After tranpsiling run `node src/server.js`, this will allow you to interact with the bot using the API.  
* Console Mode - After tranpsiling run `node src/console.js`, this will allow you to interact with the bot using your local console.  

The scaffolding produces a runable bot, to run it:  

1. Transpile the code - `npm run build`  
2. Start the bot on the console - `node src/console.js`
3. Using natural language tell the bot what your favorite food is (i.e. "My favorite food is ice cream" or "I love apples")  

###### Additional notes about building on the scaffolding
A few general notes about building on the scaffolding.

* In the real world you will probably have some additional classes to connect to services, I would recommend creating a folder under `src` named `data-access` to hold these classes 
* Manage your listen port in `config.ts`
* I elected to put dialog strings in `config.ts`, as your bot grows you may want to move these out into a separate config file. You could also put the strings in line but that feels wrong to me. 
* This server listens on `http`, to register your bot on the framework you need an `https` endpoint **with a trusted cert**, an easy way to do this is put your bot behind a proxy using AWS API gateway


[boilerplate-building-section]: BOILERPLATE.md#gulp-&-building
[boilerplate-testing-section]: BOILERPLATE.md#testing
[boilerplate-standard-section]: BOILERPLATE.md#standard-files
[blog-post]: https://blog.baileyeverts.com/building-a-chatbot-using-the-microsoft-bot-framework
[bot-framework]: https://dev.botframework.com
[luis]: https://luis.ai
[package.json]: https://github.com/beverts312/sample-bot/blob/master/package.json  
[bot.ts]: ../generators/app/templates/chatbot/src/bot.ts
[config.ts]: ../generators/app/templates/chatbot/src/config.ts
[console.ts]: ../generators/app/templates/chatbot/src/console.ts
[server.ts]: ../generators/app/templates/chatbot/src/server.ts
[dialog-base.ts]: ../generators/app/templates/chatbot/src/dialogs/dialog-base.ts
[sample.ts]: ../generators/app/templates/chatbot/src/dialogs/sample.ts
[bot-tests.ts]: ../generators/app/templates/chatbot/test/unit/bot-tests.ts
