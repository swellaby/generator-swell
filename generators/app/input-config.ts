'use strict';

import inquirer = require('inquirer');
import ProjectTypes = require('./project-types');
import promptHelpers = require('./prompt-helpers');

const prompts: inquirer.Question[] = [
    {
        type: 'input',
        name: 'appName',
        message: 'The name of your app',
        // tslint:disable-next-line:no-invalid-this
        default: this.appName
    },
    {
        type: 'input',
        name: 'description',
        message: 'The description of your app'
    },
    {
        type: 'input',
        name: 'author',
        message: 'The author of this app',
        default: 'me'
    },
    {
        type: 'list',
        name: 'type',
        message: 'What type of app is this?',
        default: ProjectTypes[ProjectTypes.boilerplate],
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
        when: promptHelpers.isExpressApiProject,
        type: 'input',
        name: 'dockerUser',
        message: 'What is your Docker Hub User Id?',
        default: promptHelpers.getDockerUserValue
    },
    {
        when: promptHelpers.isVSTSTaskProject,
        type: 'confirm',
        name: 'includeSampleVstsTask',
        message: 'Do you want me to include a sample VSTS task?',
        default: true
    },
    {
        when: promptHelpers.isVSTSTaskProject,
        type: 'input',
        name: 'taskOneName',
        message: 'What would you like to name the first VSTS task?',
        default: true
    },
    {
        type: 'confirm',
        name: 'vscode',
        message: 'Do you use Visual Studio Code?',
        default: true
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
};