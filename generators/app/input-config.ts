'use strict';

import inquirer = require('inquirer');

const boilerplatePromptValue = 'boilerplate';
const cliPromptValue = 'cli';
const expressApiPromptValue = 'express-api';
const vstsTaskPromptValue = 'vsts-task';
const chatbotPromptValue = 'chatbot';

const isExpressApiProject = (response) => {
    return response['type'] === expressApiPromptValue;
};

const prompts: inquirer.Question[] = [
    {
        type: 'input',
        name: 'appName',
        message: 'The name of your app'
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
        choices: [
            {
                name: 'New App with just the boilerplate',
                value: boilerplatePromptValue
            },
            {
                name: 'New CLI App (Not Yet Supported)',
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
        type: 'confirm',
        name: 'vscode',
        message: 'Do you use Visual Studio Code?',
        default: true
    },
    {
        when: isExpressApiProject,
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
];

export = {
    prompts: prompts,
    boilerplatePromptValue: boilerplatePromptValue,
    cliPromptValue: cliPromptValue,
    chatbotPromptValue: chatbotPromptValue,
    expressApiPromptValue: expressApiPromptValue,
    vstsTaskPromptValue: vstsTaskPromptValue,
    isExpressApiProject: isExpressApiProject
}