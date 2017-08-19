'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import pathHelpers = require('./path-helpers');

/**
 * Creates the context needed for scaffolding the Chatbot project.
 *
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
const buildChatbotContext = (extensionConfig: any): any => {
    const context = extensionConfig;
    context.dot = true;

    return context;
};

/**
 * Scaffolds the Chatbot project type
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
export const scaffoldChatbotProject = (generator: YeomanGenerator, extensionConfig: any) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to create a new Chatbot ' +
            'project :( The Chatbot files were not added to the project.');
        return;
    }

    generator.log(yosay('Engage users in new channels with a Chatbot'));

    const context = buildChatbotContext(extensionConfig);

    generator.sourceRoot(pathHelpers.chatbotRoot);
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);

    generator.fs.extendJSON(path.join(generator.destinationRoot(), 'package.json'), {
        dependencies: {
            'botbuilder': '^3.4.4',
            'restify': '^4.3.0'
        },
        devDependencies: {
            '@types/restify': '^2.0.35'
        }
    });
};