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
    const vstsCommonSourceRootBase = 'templates/vsts-common';
    const sourceRoot = vstsCommonSourceRootBase + '/**/*';
    const vstsTaskSourceRootBase = 'templates/vsts-task';
    const taskBoilerplateSourceRoot = vstsTaskSourceRootBase + '/tasks/boilerplate/';
    const taskBoilerplateTestSourceRoot = vstsTaskSourceRootBase + '/test/unit/boilerplate/';
    const boilerplateTaskManifestSource = taskBoilerplateSourceRoot + 'task.json';
    const boilerplateTaskWrapperSource = taskBoilerplateSourceRoot + 'task-wrapper.js';
    const boilerplateTaskIconSource = taskBoilerplateSourceRoot + 'icon.png';
    const boilerplateTaskSource = taskBoilerplateSourceRoot + 'task.ts';
    const boilerplateTaskTestsSource = taskBoilerplateTestSourceRoot + 'task-tests.ts';
    const taskSampleSourceRoot = vstsTaskSourceRootBase + '/tasks/sample/';
    const taskSampleTestSourceRoot = vstsTaskSourceRootBase + '/test/unit/sample/';
    const destRoot = 'project-foo';
    const destTaskRoot = destRoot + '/tasks/';
    const destTestRoot = destRoot + '/test/unit/';
    const destSampleTaskSourceRoot = destTaskRoot + 'sample/';
    const destSampleTestRoot = destTestRoot + 'sample/';
    const packageJson = destRoot + '/package.json';
    let consoleErrorStub: Sinon.SinonStub;
    let generatorLogStub: Sinon.SinonStub;
    let generatorSourceRootStub: Sinon.SinonStub;
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let generatorFsExtendJsonStub: Sinon.SinonStub;
    let uuidV4Stub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    const baseVstsTaskScripts = {
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
        'delete-taskOne-vsts-task': 'tfx build tasks delete --task-id ' + taskId
    };

    const sampleTaskScripts = {
        'upload-sample-vsts-task': 'tfx build tasks upload --task-path .vsts-publish/tasks/sample',
        'delete-sample-vsts-task': 'tfx build tasks delete --task-id ' + taskId
    };

    const singleTaskWithSampleScripts = { ...baseVstsTaskScripts, ...sampleTaskScripts };

    const packageJsonDependencies = {
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
        }
    };

    setup(() => {
        consoleErrorStub = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
        generatorLogStub = sandbox.stub(generatorStub, 'log');
        generatorSourceRootStub = sandbox.stub(generatorStub, 'sourceRoot');
        generatorSourceRootStub.callsFake(() => vstsTaskSourceRootBase);
        generatorSourceRootStub.onSecondCall().callsFake(() => vstsCommonSourceRootBase);
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
        const task1Name = 'taskOne';
        const task2Name = 'mySecondTask';
        const task3Name = 'a-third-task';
        const extensionConfig = {
            appName: vstsAppName,
            description: appDescription,
            appType: appType,
            sampleTaskId: 'foo',
            taskCategory: 'foobar',
            dot: false,
            task1Name: task1Name,
            task2Name: task2Name,
            task3Name: task3Name
        };

        const destTaskOneRoot = destTaskRoot + `${task1Name}/`;
        const destTaskOneTestRoot = destTestRoot + `${task1Name}/`;
        const destTaskOneTaskManifest = destTaskOneRoot + 'task.json';
        const destTaskOneTaskWrapper = destTaskOneRoot + 'task-wrapper.js';
        const destTaskOneTaskIcon = destTaskOneRoot + 'icon.png';
        const destTaskOneTask = destTaskOneRoot + 'task.ts';
        const destTaskOneTaskTests = destTaskOneTestRoot + 'task-tests.ts';

        const task2Scripts = {
            'upload-mySecondTask-vsts-task': 'tfx build tasks upload --task-path .vsts-publish/tasks/mySecondTask',
            'delete-mySecondTask-vsts-task': 'tfx build tasks delete --task-id ' + taskId
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
        });

        suite('sample task included Suite:', () => {
            const sampleEnabledConfig = { ...extensionConfig, ...{ includeSampleVstsTask: true } };
            const baseUploadAllTasksScript = {
                'upload-all-vsts-tasks': 'npm run upload-taskOne-vsts-task && npm run upload-sample-vsts-task'
            };

            test('Should scaffold the common VSTS content when the generator and config are valid', () => {
                vsts.scaffoldVSTSTaskProject(generatorStub, extensionConfig);
                assert.isTrue(generatorSourceRootStub.thirdCall.calledWith(pathHelpers.vstsTaskRoot));
                assert.isTrue(generatorFsCopyTplStub.calledWith(
                    sourceRoot,
                    destRoot,
                    extensionConfig
                ));
            });

            test('Should scaffold the boilerplate task content', () => {
                vsts.scaffoldVSTSTaskProject(generatorStub, sampleEnabledConfig);
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskManifestSource, destTaskOneTaskManifest, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskWrapperSource, destTaskOneTaskWrapper, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskIconSource, destTaskOneTaskIcon, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskSource, destTaskOneTask, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskTestsSource, destTaskOneTaskTests, sampleEnabledConfig));
            });

            test('Should scaffold the sample task content', () => {
                vsts.scaffoldVSTSTaskProject(generatorStub, sampleEnabledConfig);
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskManifestSource, destTaskOneTaskManifest, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskWrapperSource, destTaskOneTaskWrapper, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskIconSource, destTaskOneTaskIcon, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskSource, destTaskOneTask, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskTestsSource, destTaskOneTaskTests, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(taskSampleSourceRoot + '**/*', destSampleTaskSourceRoot, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(taskSampleTestSourceRoot + '**/*', destSampleTestRoot, sampleEnabledConfig));
            });

            test('Should add correct dependencies when the generator and config are valid', () => {
                pathJoinStub.callsFake(() => {
                    return packageJson;
                });
                vsts.scaffoldVSTSTaskProject(generatorStub, sampleEnabledConfig);
                assert.isTrue(generatorDestinationRootStub.called);
                assert.isTrue(pathJoinStub.calledWith(destRoot));
                const packageJsonScripts = {
                    scripts: { ...singleTaskWithSampleScripts, ...baseUploadAllTasksScript }
                };
                const expected = { ...packageJsonDependencies, ...packageJsonScripts };
                assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, expected));
            });

            test('Should add correct scripts when the user specifies multiple tasks', () => {
                const uploadAllScriptValue = 'npm run upload-taskOne-vsts-task && ' +
                    `npm run upload-${task2Name}-vsts-task && npm run upload-sample-vsts-task`;
                const uploadAllScript = {
                    'upload-all-vsts-tasks': uploadAllScriptValue
                };
                pathJoinStub.callsFake(() => {
                    return packageJson;
                });
                const taskScripts = {
                    scripts: { ...baseVstsTaskScripts, ...task2Scripts, ...sampleTaskScripts, ...uploadAllScript }
                };
                const expected = { ...packageJsonDependencies, ...taskScripts };
                const config = { ...sampleEnabledConfig, ...{ vstsTaskCount: 2 } };
                vsts.scaffoldVSTSTaskProject(generatorStub, config);
                assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, expected));
            });
        });

        suite('sample task excluded Suite:', () => {
            const sampleEnabledConfig = { ...extensionConfig, ...{ includeSampleVstsTask: false } };
            const baseUploadAllTasksScript = {
                'upload-all-vsts-tasks': 'npm run upload-taskOne-vsts-task'
            };

            test('Should scaffold the common VSTS content when the generator and config are valid', () => {
                vsts.scaffoldVSTSTaskProject(generatorStub, extensionConfig);
                assert.isTrue(generatorSourceRootStub.thirdCall.calledWith(pathHelpers.vstsTaskRoot));
                assert.isTrue(generatorFsCopyTplStub.calledWith(
                    sourceRoot,
                    destRoot,
                    extensionConfig
                ));
            });

            test('Should scaffold the boilerplate task content', () => {
                vsts.scaffoldVSTSTaskProject(generatorStub, sampleEnabledConfig);
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskManifestSource, destTaskOneTaskManifest, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskWrapperSource, destTaskOneTaskWrapper, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskIconSource, destTaskOneTaskIcon, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskSource, destTaskOneTask, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskTestsSource, destTaskOneTaskTests, sampleEnabledConfig));
            });

            test('Should scaffold the sample task content', () => {
                vsts.scaffoldVSTSTaskProject(generatorStub, sampleEnabledConfig);
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskManifestSource, destTaskOneTaskManifest, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskWrapperSource, destTaskOneTaskWrapper, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskIconSource, destTaskOneTaskIcon, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskSource, destTaskOneTask, sampleEnabledConfig));
                assert.isTrue(generatorFsCopyTplStub.calledWith(boilerplateTaskTestsSource, destTaskOneTaskTests, sampleEnabledConfig));
                assert.isFalse(generatorFsCopyTplStub.calledWith(taskSampleSourceRoot + '**/*', destSampleTaskSourceRoot, sampleEnabledConfig));
                assert.isFalse(generatorFsCopyTplStub.calledWith(taskSampleTestSourceRoot + '**/*', destSampleTestRoot, sampleEnabledConfig));
            });

            test('Should add correct dependencies when the generator and config are valid', () => {
                pathJoinStub.callsFake(() => {
                    return packageJson;
                });
                vsts.scaffoldVSTSTaskProject(generatorStub, sampleEnabledConfig);
                assert.isTrue(generatorDestinationRootStub.called);
                assert.isTrue(pathJoinStub.calledWith(destRoot));
                const packageJsonScripts = {
                    scripts: { ...baseVstsTaskScripts, ...baseUploadAllTasksScript }
                };
                const expected = { ...packageJsonDependencies, ...packageJsonScripts };
                assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, expected));
            });

            test('Should add correct scripts when the user specifies multiple tasks', () => {
                const uploadAllScriptValue = 'npm run upload-taskOne-vsts-task && ' +
                    `npm run upload-${task2Name}-vsts-task`;
                const uploadAllScript = {
                    'upload-all-vsts-tasks': uploadAllScriptValue
                };
                pathJoinStub.callsFake(() => {
                    return packageJson;
                });
                const taskScripts = {
                    scripts: { ...baseVstsTaskScripts, ...task2Scripts, ...uploadAllScript }
                };
                const expected = { ...packageJsonDependencies, ...taskScripts };
                const config = { ...sampleEnabledConfig, ...{ vstsTaskCount: 2 } };
                vsts.scaffoldVSTSTaskProject(generatorStub, config);
                assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, expected));
            });
        });
    });
});