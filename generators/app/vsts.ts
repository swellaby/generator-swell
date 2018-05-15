'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import uuid = require('uuid');
import yosay = require('yosay');

import pathHelpers = require('./path-helpers');

/**
 * Builds the npm scripts for a VSTS task.
 *
 * @param {string} taskName - The name of the task.
 * @param {string} taskId - The unique ID of the task.
 * @param {string} uploadTaskScriptName - The name of the npm script for uploading the task.
 * @param {string} deleteTaskScriptName - The name of the npm script for deleting the task.
 *
 * @private
 * @returns {Object}
 */
const buildTaskNpmScripts = (taskName: string, taskId: string, uploadTaskScriptName: string, deleteTaskScriptName: string) => {
    const uploadTaskScriptValue = `tfx build tasks upload --task-path .vsts-publish/tasks/${taskName}`;
    const deleteTaskScriptValue = `tfx build tasks delete --task-id ${taskId}`;
    const scripts = {};
    scripts[uploadTaskScriptName] = uploadTaskScriptValue;
    scripts[deleteTaskScriptName] = deleteTaskScriptValue;

    return scripts;
};

/**
 * Creates the npm script names for the task.
 *
 * @param {string} taskName - The name of the task.
 *
 * @private
 * @returns {Object}
 */
const createNpmTaskScriptNames = (taskName: string) => {
    const uploadTaskScriptName = `upload-${taskName}-vsts-task`;
    const deleteTaskScriptName = `delete-${taskName}-vsts-task`;

    return {
        uploadTaskScriptName: uploadTaskScriptName,
        deleteTaskScriptName: deleteTaskScriptName
    };
};

const buildExtensionTaskContribution = (taskName: string) => {
    return {
        'id': `${taskName}`,
        'type': 'ms.vss-distributed-task.task',
        'description': '',
        'targets': [
            'ms.vss-distributed-task.tasks'
        ],
        'properties': {
            'name': `tasks/${taskName}`
        }
    };
};

const getExtensionImageFiles = () => {
    return {
        'path': 'images'
    };
};

const buildExtensionTaskFiles = (taskName: string) => {
    return {
        'path': `tasks/${taskName}`
    };
};

/**
 * Returns the npm script values for a VSTS task project.
 */
const getVstsTaskNpmScripts = (context) => {
    const taskName = 'sample';
    buildExtensionTaskFiles(taskName);
    getExtensionImageFiles();
    buildExtensionTaskContribution(taskName);
    const taskScriptNames = createNpmTaskScriptNames(taskName);
    const taskScripts = buildTaskNpmScripts(taskName, context.sampleTaskId, taskScriptNames.uploadTaskScriptName, taskScriptNames.deleteTaskScriptName);
    taskScripts['upload-all-vsts-tasks'] = `npm run ${taskScriptNames.uploadTaskScriptName}`;

    const baseScripts = {
        'tfx-login': 'tfx login',
        'create-task': 'cd tasks && tfx build tasks create',
        'package-vsts-tasks': 'gulp package-vsts-tasks',
        'upload-vsts-task': 'tfx build tasks upload --task-path ',
        'delete-vsts-task': 'tfx build tasks delete --task-id ',
        'pack-up-single-vsts-task': 'npm run package-vsts-tasks && npm run upload-vsts-task',
        'pack-up-vsts-tasks': 'npm run package-vsts-tasks && npm run upload-all-vsts-tasks',
        'package-vsts-extension': 'gulp package-vsts-task-extension-files && cd .vsts-publish && tfx extension create',
        'bump-package-vsts-extension': 'gulp bump-package-vsts-task-extension-files && cd .vsts-publish && tfx extension create',
        'publish-vsts-extension': 'cd .vsts-publish && tfx extension publish',
        'bump-pack-pub-vsts-extension': 'gulp bump-package-vsts-task-extension-files && npm run publish-vsts-extension',
        'pack-pub-vsts-extension': 'gulp package-vsts-task-extension-files && npm run publish-vsts-extension'
    };

    return { ...baseScripts, ...taskScripts };
};

/**
 * Creates the context needed for scaffolding the VSTS Task.
 *
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
// tslint:disable-next-line:no-any
const buildVSTSContext = (extensionConfig: any): any => {
    extensionConfig.dot = true;
    extensionConfig.sampleTaskId = uuid.v4();
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
// tslint:disable-next-line:no-any
const addVstsTaskContentToPackageJson = (generator: YeomanGenerator, context: any) => {
    const vstsTaskNpmScripts = getVstsTaskNpmScripts(context);
    generator.fs.extendJSON(path.join(generator.destinationRoot(), 'package.json'), {
        dependencies: {
            'loglevel': '^1.6.1',
            'request': '^2.85.0',
            'vsts-task-lib': '^2.4.0'
        },
        devDependencies: {
            '@types/request': '^2.47.0',
            'copy-node-modules': '^1.0.4',
            'gulp-bump': '^3.1.1',
            'tfx-cli': '^0.5.10',
            'gulp-vsts-bump': '^1.0.5'
        },
        scripts: vstsTaskNpmScripts
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
    addVstsTaskContentToPackageJson(generator, context);
    // generator.fs.copyTpl(generator.sourceRoot() + '/gulp/*', generator.destinationRoot(), context);

    // const tasks: string[] = [];

    // if (extensionConfig.includeSampleVstsTask) {
    //     tasks.push('sample');
    // }
    // tasks.push('taskone');

    // addVstsTaskContentToPackageJson(generator, context, tasks);
};