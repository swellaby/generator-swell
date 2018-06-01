'use strict';

import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import uuid = require('uuid');
import yosay = require('yosay');

import pathHelpers = require('./path-helpers');

const extensionContributions = [];
const extensionFiles = [];
let uploadAllTaskScriptValue = '';
let vstsTaskScripts = {};
const DEFAULT_MAX_TASKS = 1;

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

/**
 * Builds the task object to be added to the contribution array in the
 * extension manifest.
 *
 * @param {string} taskName - The name of the task.
 * @returns {Object}
 */
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

/**
 * Returns the image files object to be added to the extension manifest.
 * @returns {Object}
 */
const getExtensionImageFiles = () => {
    return {
        'path': 'images'
    };
};

/**
 * Builds the task files object to be added to the extension manifest.
 * @returns {Object}
 */
const buildExtensionTaskFiles = (taskName: string) => {
    return {
        'path': `tasks/${taskName}`
    };
};

/**
 * Returns the npm script values for a VSTS task project.
 * @returns {Object}
 */
const getVstsTaskNpmScripts = (context, taskScripts) => {
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
 * @returns {Object}
 */
const buildVSTSContext = (extensionConfig) => {
    extensionConfig.dot = true;
    extensionConfig.taskCategory = 'Utility';
    return extensionConfig;
};

/**
 * Scaffolds the content that is common for all VSTS projects.
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {Object} extensionConfig - The configuration specified for generation.
 */
const scaffoldSharedVSTSContent = (generator: YeomanGenerator, context) => {
    generator.sourceRoot(pathHelpers.vstsCommonRoot);
    generator.fs.copyTpl(generator.sourceRoot() + '/**/*', generator.destinationRoot(), context);
};

/**
 * Updates the package.json file with the relevant content for th
 * @param {YeomanGenerator} generator - The yeoman generator.
 */
const addVstsTaskContentToPackageJson = (generator: YeomanGenerator, context, taskScripts) => {
    const vstsTaskNpmScripts = getVstsTaskNpmScripts(context, taskScripts);
    const extension = {
        dependencies: {
            'loglevel': '^1.6.1',
            'request': '^2.87.0',
            'vsts-task-lib': '^2.4.0'
        },
        devDependencies: {
            '@types/request': '^2.47.0',
            'copy-node-modules': '^1.0.4',
            'gulp-bump': '^3.1.1',
            'gulp-vsts-bump': '^1.0.6',
            'tfx-cli': '^0.5.10'
        },
        scripts: vstsTaskNpmScripts
    };
    generator.fs.extendJSON(path.join(generator.destinationRoot(), 'package.json'), extension);
};

/**
 * Scaffolds the boilerplate content for the new VSTS Task.
 *
 * @param {string} taskName - The name of the task.
 * @param {string} taskId - The id of the task.
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {Object} extensionConfig - The configuration specified for generation.
 */
const scaffoldVstsTaskBoilerplate = (taskName: string, taskId: string, generator: YeomanGenerator, extensionConfig: any) => {
    generator.sourceRoot(pathHelpers.vstsTaskRoot);
    const srcTaskBoilerplate = generator.sourceRoot() + '/tasks/boilerplate/';
    const srcTaskTest = generator.sourceRoot() + '/test/unit/boilerplate/';
    extensionConfig.taskName = taskName;
    extensionConfig.taskId = taskId;
    const srcDest = generator.destinationRoot() + `/tasks/${taskName}/`;
    const testDest = generator.destinationRoot() + `/test/unit/${taskName}/`;
    generator.fs.copyTpl(srcTaskBoilerplate + 'task.json', srcDest + 'task.json', extensionConfig);
    generator.fs.copyTpl(srcTaskBoilerplate + 'task-wrapper.js', srcDest + 'task-wrapper.js', extensionConfig);
    generator.fs.copyTpl(srcTaskBoilerplate + 'icon.png', srcDest + 'icon.png', extensionConfig);
    generator.fs.copyTpl(srcTaskBoilerplate + 'task.ts', srcDest + 'task.ts', extensionConfig);
    generator.fs.copyTpl(srcTaskTest + 'task-tests.ts', testDest + 'task-tests.ts', extensionConfig);
};

/**
 * Updates the various manifest files with the dynamically generated content.
 *
 * @param {string} taskName - The name of the task.
 * @param {string} taskId - The id of the task.
 * @param {boolean} isFirstTask - Indicates whether this task is the first task that has been scaffolded.
 */
const updateManifests = (taskName: string, taskId: string, isFirstTask: boolean) => {
    extensionFiles.push(buildExtensionTaskFiles(taskName));
    extensionContributions.push(buildExtensionTaskContribution(taskName));
    const taskScriptNames = createNpmTaskScriptNames(taskName);
    const taskScripts = buildTaskNpmScripts(taskName, taskId, taskScriptNames.uploadTaskScriptName, taskScriptNames.deleteTaskScriptName);
    if (!isFirstTask) {
        uploadAllTaskScriptValue += ' && ';
    }
    uploadAllTaskScriptValue += `npm run ${taskScriptNames.uploadTaskScriptName}`;
    vstsTaskScripts = { ...vstsTaskScripts, ...taskScripts };
};

/**
 * Scaffolds a new custom VSTS Task.
 *
 * @param {string} taskName - The name of the task.
 * @param {boolean} isFirstTask - Indicates whether this task is the first task that has been scaffolded.
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {Object} extensionConfig - The configuration specified for generation.
 */
const scaffoldVstsTask = (taskName: string, isFirstTask: boolean, generator: YeomanGenerator, extensionConfig) => {
    const taskId = uuid.v4();
    scaffoldVstsTaskBoilerplate(taskName, taskId, generator, extensionConfig);
    updateManifests(taskName, taskId, isFirstTask);
};

/**
 * Scaffolds a new sample VSTS Task.
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {Object} extensionConfig - The configuration specified for generation.
 */
const scaffoldSampleVstsTask = (generator: YeomanGenerator, extensionConfig) => {
    const sampleTaskName = 'sample';
    scaffoldVstsTask(sampleTaskName, false, generator, extensionConfig);
    generator.fs.copyTpl(generator.sourceRoot() + `/tasks/${sampleTaskName}/**/*`, generator.destinationRoot() + `/tasks/${sampleTaskName}/`, extensionConfig);
    generator.fs.copyTpl(generator.sourceRoot() + `/test/unit/${sampleTaskName}/**/*`, generator.destinationRoot() + `/test/unit/${sampleTaskName}/`, extensionConfig);
};

/**
 * Scaffolds the VSTS Task content based on the user specified input.
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {Object} extensionConfig - The configuration specified for generation.
 */
const scaffoldVstsTasks = (generator: YeomanGenerator, extensionConfig) => {
    const numTasks = extensionConfig.vstsTaskCount || DEFAULT_MAX_TASKS;
    for (let i = 1; i < numTasks + 1; i++) {
        const taskName = extensionConfig[`task${i}Name`];
        if (taskName) {
            const isFirstTask = (i === 1);
            scaffoldVstsTask(taskName, isFirstTask, generator, extensionConfig);
        }
    }

    if (extensionConfig.includeSampleVstsTask) {
        scaffoldSampleVstsTask(generator, extensionConfig);
    }

    vstsTaskScripts['upload-all-vsts-tasks'] = uploadAllTaskScriptValue;
    generator.fs.copyTpl(generator.sourceRoot() + '/gulp/**/*', generator.destinationRoot() + '/gulp/', extensionConfig);
    generator.fs.extendJSON(path.join(generator.destinationRoot(), 'vss-extension.json'), {
        files: extensionFiles,
        contributions: extensionContributions
    });
    addVstsTaskContentToPackageJson(generator, extensionConfig, vstsTaskScripts);
};

/**
 * Initializes the global fields in preparation for scaffolding.
 */
const initialize = () => {
    extensionContributions.length = 0;
    extensionFiles.length = 0;
    extensionFiles.push(getExtensionImageFiles());
    uploadAllTaskScriptValue = '';
    vstsTaskScripts = {};
};

/**
 * Scaffolds the VSTS Task project type
 *
 * @param {YeomanGenerator} generator - The yeoman generator.
 * @param {JSON} extensionConfig - The configuration specified for generation.
 */
export const scaffoldVSTSTaskProject = (generator: YeomanGenerator, extensionConfig) => {
    if (!generator || !extensionConfig) {
        console.error('Oh no! Encountered an unexpected error while trying to create a new VSTS ' +
            'Task project :( The VSTS files were not added to the project.');
        return;
    }

    generator.log(yosay('A new task to make a great platform even better'));
    initialize();
    const context = buildVSTSContext(extensionConfig);
    scaffoldSharedVSTSContent(generator, context);
    scaffoldVstsTasks(generator, context);
};