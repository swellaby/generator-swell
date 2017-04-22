'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import pathHelpers = require('./../../../generators/app/path-helpers');
import ProjectTypes = require('./../../../generators/app/project-types');
import testHelpers = require('./../test-helpers');
import vscode = require('./../../../generators/app/vscode');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in vscode.ts
 */
suite('VS Code Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    let generatorStub: YeomanGenerator;
    const taskId = '626c88e3-1e13-4663-abdc-5658b0757b80';
    const sourceRootBase = 'templates/vsts-common';
    const sourceRoot = sourceRootBase + '/**/*';
    const destRootBase = 'project-foo';
    const destRoot = destRootBase + '/.vscode';
    const launchJson = destRoot + '/launch.json';
    // tslint:disable-next-line:no-any
    const launchSettings: any = { configurations: [ { program: undefined }]};
    let consoleErrorStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    let generatorSourceRootStub: Sinon.SinonStub;
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorFsReadJsonStub: Sinon.SinonStub;
    let generatorFsWriteJsonStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    const extensionConfig = {
        appName: 'not important',
        description: 'ditto',
        type: ProjectTypes[ProjectTypes.boilerplate],
        taskId: 'foo',
        category: 'foobar',
        dot: false
    };

    setup(() => {
        consoleErrorStub = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
        generatorLogStub = sandbox.stub(generatorStub, 'log');
        generatorSourceRootStub = sandbox.stub(generatorStub, 'sourceRoot').callsFake(() => {
            return sourceRootBase;
        });
        generatorFsCopyTplStub = sandbox.stub(generatorStub.fs, 'copyTpl');
        generatorFsReadJsonStub = sandbox.stub(generatorStub.fs, 'readJSON');
        generatorFsWriteJsonStub = sandbox.stub(generatorStub.fs, 'writeJSON');
        generatorDestinationRootStub = sandbox.stub(generatorStub, 'destinationRoot').callsFake(() => {
            return destRootBase;
        });
        pathJoinStub = sandbox.stub(path, 'join');
    });
    const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to scaffold the VS Code ' +
        'content :( The VS Code files were not added to the project.'

    teardown(() => {
        sandbox.restore();
    });

    /**
     * Contains unit tests for the scaffoldVSCodeContent function.
     */
    suite('scaffoldVSCodeContent Tests:', () => {
        test('Should display an error message when the generator is null and the extension config is null', () => {
            vscode.scaffoldVSCodeContent(null, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            vscode.scaffoldVSCodeContent(null, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            vscode.scaffoldVSCodeContent(null, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            vscode.scaffoldVSCodeContent(null, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            vscode.scaffoldVSCodeContent(undefined, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            vscode.scaffoldVSCodeContent(undefined, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            vscode.scaffoldVSCodeContent(undefined, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            vscode.scaffoldVSCodeContent(undefined, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            vscode.scaffoldVSCodeContent(generatorStub, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            vscode.scaffoldVSCodeContent(generatorStub, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            vscode.scaffoldVSCodeContent(generatorStub, {});
            assert.isFalse(consoleErrorStub.called);
        });

        test('Should use the correct context when the generator and config are valid', () => {
            vscode.scaffoldVSCodeContent(generatorStub, extensionConfig);
            assert.deepEqual(extensionConfig.dot, true);
        });

        test('Should scaffold the VSTS Task content when the generator and config are valid', () => {
            vscode.scaffoldVSCodeContent(generatorStub, extensionConfig);
            assert.isTrue(generatorSourceRootStub.calledWith(pathHelpers.vscodeRoot));
            assert.isTrue(generatorFsCopyTplStub.calledWith(
                sourceRoot,
                destRoot,
                extensionConfig
            ));
        });

        test('Should not add any launch settings when the project type is boilerplate', () => {
            pathJoinStub.callsFake(() => {
                return launchJson;
            });
            generatorFsReadJsonStub.callsFake(() => {
                return launchSettings;
            });

            extensionConfig.type = ProjectTypes[ProjectTypes.boilerplate];
            vscode.scaffoldVSCodeContent(generatorStub, extensionConfig);
            assert.isTrue(generatorFsReadJsonStub.calledWith(launchJson, {}));
            assert.deepEqual(launchSettings.configurations[0].program, undefined);
            assert.isTrue(generatorFsWriteJsonStub.calledWith(launchJson, launchSettings));
        });

        test('Should not add any launch settings when the project type is cli', () => {
            pathJoinStub.callsFake(() => {
                return launchJson;
            });
            generatorFsReadJsonStub.callsFake(() => {
                return launchSettings;
            });

            extensionConfig.type = ProjectTypes[ProjectTypes.cli];
            vscode.scaffoldVSCodeContent(generatorStub, extensionConfig);
            assert.isTrue(generatorFsReadJsonStub.calledWith(launchJson, {}));
            assert.deepEqual(launchSettings.configurations[0].program, undefined);
            assert.isTrue(generatorFsWriteJsonStub.calledWith(launchJson, launchSettings));
        });

        test('Should not add any launch settings when the project type is vsts task', () => {
            pathJoinStub.callsFake(() => {
                return launchJson;
            });
            generatorFsReadJsonStub.callsFake(() => {
                return launchSettings;
            });

            extensionConfig.type = ProjectTypes[ProjectTypes.vstsTask];
            vscode.scaffoldVSCodeContent(generatorStub, extensionConfig);
            assert.isTrue(generatorFsReadJsonStub.calledWith(launchJson, {}));
            assert.deepEqual(launchSettings.configurations[0].program, undefined);
            assert.isTrue(generatorFsWriteJsonStub.calledWith(launchJson, launchSettings));
        });

        test('Should add the correct launch settings when the project type is chatbot', () => {
            pathJoinStub.callsFake(() => {
                return launchJson;
            });
            generatorFsReadJsonStub.callsFake(() => {
                return launchSettings;
            });

            extensionConfig.type = ProjectTypes[ProjectTypes.chatbot];
            vscode.scaffoldVSCodeContent(generatorStub, extensionConfig);
            assert.isTrue(generatorFsReadJsonStub.calledWith(launchJson, {}));
            assert.deepEqual(launchSettings.configurations[0].program, '${workspaceRoot}/src/server.ts');
            assert.isTrue(generatorFsWriteJsonStub.calledWith(launchJson, launchSettings));
        });

        test('Should add the correct launch settings when the project type is express api', () => {
            pathJoinStub.callsFake(() => {
                return launchJson;
            });
            generatorFsReadJsonStub.callsFake(() => {
                return launchSettings;
            });

            extensionConfig.type = ProjectTypes[ProjectTypes.expressApi];
            vscode.scaffoldVSCodeContent(generatorStub, extensionConfig);
            assert.isTrue(generatorFsReadJsonStub.calledWith(launchJson, {}));
            assert.deepEqual(launchSettings.configurations[0].program, '${workspaceRoot}/src/app.ts');
            assert.isTrue(generatorFsWriteJsonStub.calledWith(launchJson, launchSettings));
        });
    });
});