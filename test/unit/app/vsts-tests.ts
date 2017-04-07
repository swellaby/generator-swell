'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import uuid = require('uuid');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import inputConfig = require('./../../../generators/app/input-config');
import pathHelpers = require('./../../../generators/app/path-helpers');
import testHelpers = require('./../test-helpers');
import vsts = require('./../../../generators/app/vsts');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in vsts.ts
 */
suite('VSTS Project Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
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

    suite('ScaffoldVSTSTaskProject Tests:', () => {
        const vstsAppName = 'vsts task';
        const appType = inputConfig.vstsTaskPromptValue;
        const appDescription = 'this is an awesome vsts task';
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new VSTS ' +
            'Task project :( The VSTS files were not added to the project.'
        const extensionConfig = {
            appName: vstsAppName,
            description: appDescription,
            appType: appType,
            taskId: 'foo',
            category: 'foobar',
            dot: false
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
            assert.deepEqual(extensionConfig.taskId, taskId);
            assert.deepEqual(extensionConfig.dot, true);
            assert.deepEqual(extensionConfig.category, 'Utility');
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
            assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, {
                dependencies: {
                    'request': '^2.79.0',
                    'vsts-task-lib': '^1.1.0'
                },
                devDependencies: {
                    '@types/request': '^0.0.36'
                }
            }));
        });
    });
});