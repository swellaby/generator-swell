'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import uuid = require('uuid');
import yosay = require('yosay');

import pathHelpers = require('./path-helpers');

/**
 * Creates the context needed for scaffolding the VSTS Task.
 *
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
const buildVSTSContext = (extensionConfig: any): any => {
    // const context = extensionConfig;
    // context.dot = true;
    // context.taskId = uuid.v4();
    // context.taskCategory = 'Utility'; // from new prompt

    // return context;
    extensionConfig.dot = true;
    extensionConfig.taskId = uuid.v4();
    extensionConfig.taskCategory = 'Utility';
    return extensionConfig;
};

/**
 * Scaffolds the content that is common for all VSTS projects.
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
const scaffoldSharedVSTSContent = (generator: YeomanGenerator, context: any) => {
    generator.sourceRoot(pathHelpers.vstsCommonRoot);
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);
};

/**
 * Updates the package.json file with the relevant content for th
 * @param {YeomanGenerator} generator - The yeoman generator.
 */
const addVstsTaskContentToPackageJson = (generator: YeomanGenerator) => {
    generator.fs.extendJSON(path.join(generator.destinationRoot(), 'package.json'), {
        dependencies: {
            'request': '^2.81.0',
            'vsts-task-lib': '^2.0.7'
        },
        devDependencies: {
            '@types/request': '^2.0.2',
            'tfx-cli': '^0.4.9'
        },
        scripts: {
            'tfx-login': 'tfx login',
            'package-vsts-task': 'gulp package-vsts-task-src package-vsts-task-files',
            'upload-vsts-task': 'tfx build tasks upload --task-path .vsts-publish',
            'pack-up-vsts-task': 'npm run package-vsts-task && npm run upload-vsts-task',
            'package-vsts-task-extension': 'gulp package-vsts-task-extension-files && cd .vsts-publish && tfx extension create',
            'publish-vsts-task-extension': 'cd .vsts-publish && tfx extension publish',
            'pack-pub-vsts-task-extension': 'gulp package-vsts-task-extension-files && cd .vsts-publish && tfx extension publish'
        }
    });
};

/**
 * Scaffolds the VSTS Task project type
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
export const scaffoldVSTSTaskProject = (generator: YeomanGenerator, extensionConfig: any) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to create a new VSTS ' +
            'Task project :( The VSTS files were not added to the project.');
        return;
    }

    generator.log(yosay('A new task to make a great platform even better'));
    const context = buildVSTSContext(extensionConfig);
    scaffoldSharedVSTSContent(generator, context);

    generator.sourceRoot(pathHelpers.vstsTaskRoot);
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);
    addVstsTaskContentToPackageJson(generator);
};