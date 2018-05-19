'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import uuid = require('uuid');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import pathHelpers = require('./../../../generators/app/path-helpers');
import ProjectTypes = require('./../../../generators/app/project-types');
import testHelpers = require('./../test-helpers');
import vsts = require('./../../../generators/app/vsts');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in vsts.ts
 */
suite('VSTS Project Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.createSandbox();
    let generatorStub: YeomanGenerator;
    const descriptionMessage = 'A new task to make a great platform even better';
    const taskId = '626c88e3-1e13-4663-abdc-5658b0757b80';
    const sourceRootBase = 'templates/vsts-common';
    const sourceRoot = sourceRootBase + '/**/*';
    const destRoot = 'project-foo';
    const packageJson = destRoot + '/package.json';
    let consoleErrorStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    let generatorSourceRootStub: Sinon.SinonStub;
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let generatorFsExtendJsonStub: Sinon.SinonStub;
    let uuidV4Stub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    const vstsTaskScripts = {
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
        'pack-pub-vsts-extension': 'gulp package-vsts-task-extension-files && npm run publish-vsts-extension',
        'upload-taskOne-vsts-task': 'tfx build tasks upload --task-path .vsts-publish/tasks/taskOne',
        'delete-taskOne-vsts-task': 'tfx build tasks delete --task-id ' + taskId,
        'upload-sample-vsts-task': 'tfx build tasks upload --task-path .vsts-publish/tasks/sample',
        'delete-sample-vsts-task': 'tfx build tasks delete --task-id ' + taskId,
        'upload-all-vsts-tasks': 'npm run upload-taskOne-vsts-task && npm run upload-sample-vsts-task'
    };

    setup(() => {
        consoleErrorStub = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
        generatorLogStub = sandbox.stub(generatorStub, 'log');
        generatorSourceRootStub = sandbox.stub(generatorStub, 'sourceRoot').callsFake(() => {
            return sourceRootBase;
        });
        generatorFsCopyTplStub = sandbox.stub(generatorStub.fs, 'copyTpl');
        generatorDestinationRootStub = sandbox.stub(generatorStub, 'destinationRoot').callsFake(() => {
            return destRoot;
        });
        uuidV4Stub = sandbox.stub(uuid, 'v4').callsFake(() => {
            return taskId;
        });
        generatorFsExtendJsonStub = sandbox.stub(generatorStub.fs, 'extendJSON');
        pathJoinStub = sandbox.stub(path, 'join');
    });

    teardown(() => {
        sandbox.restore();
    });

    /**
     * Contains unit tests for the scaffoldVSTSTaskProject function.
     */
    suite('scaffoldVSTSTaskProject Tests:', () => {
        const vstsAppName = 'vsts task';
        const appType = ProjectTypes[ProjectTypes.vstsTask];
        const appDescription = 'this is an awesome vsts task';
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new VSTS ' +
            'Task project :( The VSTS files were not added to the project.';
        const extensionConfig = {
            appName: vstsAppName,
            description: appDescription,
            appType: appType,
            sampleTaskId: 'foo',
            taskCategory: 'foobar',
            dot: false,
            includeSampleVstsTask: true,
            taskOneName: 'taskOne'
        };

        test('Should display an error message when the generator is null and the extension config is null', () => {
            vsts.scaffoldVSTSTaskProject(null, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            vsts.scaffoldVSTSTaskProject(null, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            vsts.scaffoldVSTSTaskProject(null, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            vsts.scaffoldVSTSTaskProject(null, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            vsts.scaffoldVSTSTaskProject(undefined, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            vsts.scaffoldVSTSTaskProject(undefined, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            vsts.scaffoldVSTSTaskProject(undefined, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            vsts.scaffoldVSTSTaskProject(undefined, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            vsts.scaffoldVSTSTaskProject(generatorStub, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            vsts.scaffoldVSTSTaskProject(generatorStub, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            vsts.scaffoldVSTSTaskProject(generatorStub, {});
            assert.isFalse(consoleErrorStub.called);
            assert.isTrue(generatorLogStub.calledWith(yosay(descriptionMessage)));
        });

        test('Should scaffold shared VSTS content when the generator is valid and the extension config is valid', () => {
            vsts.scaffoldVSTSTaskProject(generatorStub, extensionConfig);
            assert.isFalse(consoleErrorStub.called);
            assert.isTrue(generatorLogStub.calledWith(yosay(descriptionMessage)));
            assert.isTrue(generatorSourceRootStub.calledWith(pathHelpers.vstsCommonRoot));
            assert.isTrue(generatorFsCopyTplStub.calledWith(
                sourceRoot,
                destRoot,
                extensionConfig
            ));
        });

        test('Should add the correct task id and category options', () => {
            vsts.scaffoldVSTSTaskProject(generatorStub, extensionConfig);
            assert.deepEqual(extensionConfig.dot, true);
            assert.deepEqual(extensionConfig.taskCategory, 'Utility');
            assert.isTrue(uuidV4Stub.called);
            assert.deepEqual(extensionConfig.sampleTaskId, taskId);
        });

        test('Should scaffold the VSTS Task content when the generator and config are valid', () => {
            vsts.scaffoldVSTSTaskProject(generatorStub, extensionConfig);
            assert.isTrue(generatorSourceRootStub.thirdCall.calledWith(pathHelpers.vstsTaskRoot));
            assert.isTrue(generatorFsCopyTplStub.calledWith(
                sourceRoot,
                destRoot,
                extensionConfig
            ));
        });

        test('Should add correct dependencies when the generator and config are valid', () => {
            pathJoinStub.callsFake(() => {
                return packageJson;
            });
            vsts.scaffoldVSTSTaskProject(generatorStub, extensionConfig);
            assert.isTrue(generatorDestinationRootStub.called);
            assert.isTrue(pathJoinStub.calledWith(destRoot));
            assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, {
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
                scripts: vstsTaskScripts
            }));
        });
    });
});