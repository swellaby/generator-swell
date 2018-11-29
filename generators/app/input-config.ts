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
        type: 'list',
        name: 'vstsTaskCount',
        message: 'How many VSTS Tasks do you want?',
        default: 1,
        choices: [
            {
                name: '1',
                value: 1
            },
            {
                name: '2',
                value: 2
            },
            {
                name: '3',
                value: 3
            },
            {
                name: '4',
                value: 4
            },
            {
                name: '5',
                value: 5
            }
        ]
    },
    {
        when: promptHelpers.isVSTSTaskProject,
        type: 'input',
        name: 'task1Name',
        message: 'What would you like to name the first VSTS task?',
        default: 'taskOne'
    },
    {
        when: promptHelpers.isRequestedVstsTaskCountGreaterThanOne,
        type: 'input',
        name: 'task2Name',
        message: 'What would you like to name the second VSTS task?',
        default: 'taskTwo'
    },
    {
        when: promptHelpers.isRequestedVstsTaskCountGreaterThanTwo,
        type: 'input',
        name: 'task3Name',
        message: 'What would you like to name the third VSTS task?',
        default: 'taskThree'
    },
    {
        when: promptHelpers.isRequestedVstsTaskCountGreaterThanThree,
        type: 'input',
        name: 'task4Name',
        message: 'What would you like to name the fourth VSTS task?',
        default: 'taskFour'
    },
    {
        when: promptHelpers.isRequestedVstsTaskCountGreaterThanFour,
        type: 'input',
        name: 'task5Name',
        message: 'What would you like to name the fifth VSTS task?',
        default: 'taskFive'
    },
    {
        when: promptHelpers.isVSTSTaskProject,
        type: 'confirm',
        name: 'includeSampleVstsTask',
        message: 'Do you want me to include a sample VSTS task?',
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