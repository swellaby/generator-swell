'use strict';

var boilerplatePromptValue = 'boilerplate';
var cliPromptValue = 'cli';
var expressApiPromptValue = 'express-api';
var vstsTaskPromptValue = 'vsts-task';
var chatbotPromptValue = 'chatbot';

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'appName',
            message: 'The name of your app',
            required: true,
        },
        {
            type: 'input',
            name: 'description',
            message: 'The description of your app'
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type of app is this?',
            default: boilerplatePromptValue,
            required: true,
            choices: [
                {
                    name: 'New App with just the boilerplate',
                    value: boilerplatePromptValue
                },
                {
                    name: 'New CLI App',
                    value: cliPromptValue
                },
                {
                    name: 'New API App with Express and Docker',
                    value: expressApiPromptValue
                },
                {
                    name: 'New VSTS Task',
                    value: vstsTaskPromptValue
                },
                {
                    name: 'New Chatbot',
                    value: chatbotPromptValue
                }
            ]
        },
        {
            when: function (response) {
                return response.type === expressApiPromptValue;
            },
            type: 'input',
            name: 'dockerUser',
            message: 'What is your Docker Hub User Id?',
            default: 'user'
        },
        {
            type: 'confirm',
            name: 'installDependencies',
            message: 'Do you want me to install dependencies for you?',
            default: true
        }
    ],
    boilerplatePromptValue: boilerplatePromptValue,
    cliPromptValue: cliPromptValue,
    chatbotPromptValue: chatbotPromptValue,
    expressApiPromptValue: expressApiPromptValue,
    vstsTaskPromptValue: vstsTaskPromptValue
};