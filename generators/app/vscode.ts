'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');

import inputConfig = require('./input-config');
import pathHelpers = require('./path-helpers');

/**
 * Scaffolds the VS Code content.
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
export const scaffoldVSCodeContent = (generator: YeomanGenerator, extensionConfig: any) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to scaffold the ' +
            'VS Code content :( The VS Code files were not added to the project.');
        return;
    }

    generator.sourceRoot(pathHelpers.vscodeRoot);
    const context = extensionConfig;
    context.dot = true;
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot() + '/.vscode', context);

    const launch = generator.fs.readJSON(path.join(generator.destinationRoot(), '.vscode/launch.json'), {});

    if (context.type === inputConfig.chatbotPromptValue) {
        launch.configurations[0].program = '${workspaceRoot}/src/server.ts';
    } else if (context.type === inputConfig.expressApiPromptValue) {
        launch.configurations[0].program = '${workspaceRoot}/src/app.ts';
    }

    generator.fs.writeJSON(path.join(generator.destinationRoot(), '.vscode/launch.json'), launch);
}