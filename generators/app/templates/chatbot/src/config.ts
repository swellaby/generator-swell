const config = {
    bot: {
        /*
        * To obtain these:
        * 1. go to: https://dev.botframework.com/
        * 2. sign in/create an account
        * 3. Click "Register a bot"
        * 4. Click "Create Microsoft App ID and password"
        * You should complete the registration process as you will need to do it anyways
        */
        app: process.env.BOT_APP_ID || 'APP_ID',
        key: process.env.BOT_KEY || 'KEY'
    },
    dialogs: {
        paths: {
            // Add paths to bind dialogs here
            sample: '/sample'
        },
        speech: {
            // Add generic pieces of text here, to see how these are leveraged look at bot.ts
            iDontUnderstand: 'Sorry, I do not understand what you are saying',
            sample: {
                askFood: 'What is your favorite food?',
                respondFood: 'Your favorite food is %s'
            }
        }
    },
    luis: {
        /*
        * To obtain these:
        * 1. go to: https://www.luis.ai/ 
        * 2. sign in/create an account
        * 3. Create a new app
        * The provided app/key will work with the sample dialog
        */
        app: process.env.LUIS_APP || '9bb7981e-1a1f-4620-9ec4-31e0e83ee31c',
        key: process.env.LUIS_KEY || '5b2e4012f3e84a9483e8f048609e2db9',
        url: process.env.LUIS_URL || 'https://api.projectoxford.ai/luis/v2.0/apps/##APP##?subscription-key=##KEY##&verbose=true'
    },
    webServer: {
        port: process.env.WEB_SERVER_PORT || 3798
    }
};

export = config;
