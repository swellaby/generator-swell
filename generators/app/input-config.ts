'use strict';

import inquirer = require('inquirer');
import ProjectTypes = require('./project-types');
import promptHelpers = require('./prompt-helpers');

const boilerplatePromptValue = 'boilerplate';
const cliPromptValue = 'cli';
const expressApiPromptValue = 'express-api';
const vstsTaskPromptValue = 'vsts-task';
const chatbotPromptValue = 'chatbot';

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
                value: ProjectTypes[ProjectTypes.boilerplate]
            },
            {
                name: 'New CLI App (Not Yet Supported)',
                value: ProjectTypes[ProjectTypes.cli]
            },
            {
                name: 'New API App with Express and Docker',
                value: ProjectTypes[ProjectTypes.expressApi]
            },
            {
                name: 'New VSTS Task',
                value: ProjectTypes[ProjectTypes.vstsTask]
            },
            {
                name: 'New Chatbot',
                value: ProjectTypes[ProjectTypes.chatbot]
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
        when: promptHelpers.isExpressApiProject,
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
    prompts: prompts
}

    // boilerplatePromptValue: boilerplatePromptValue,
    // cliPromptValue: cliPromptValue,
    // chatbotPromptValue: chatbotPromptValue,
    // expressApiPromptValue: expressApiPromptValue,
    // vstsTaskPromptValue: vstsTaskPromptValue