'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import boilerplate = require('./../../../generators/app/boilerplate');
import pathHelpers = require('./../../../generators/app/path-helpers');
import testHelpers = require('./../test-helpers');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in boilerplate.ts
 */
suite('Boilerplate Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    let consoleErrorStub: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;
    const extensionConfig = {
        appName: 'asdf',
        description: 'words',
        type: 'doesnt matter',
        dot: false
    };
    const sourceRootBase = 'templates/boilerplate';
    const sourceRoot = sourceRootBase + '/**/*';
    const destRoot = 'asde';
    const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to scaffold the ' +
        'boilerplate content :( The boilerplate files were not added to the project.';
    let generatorSourceRootStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorFsMoveStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    let pathResolveStub: Sinon.SinonStub;
    const npmIgnoreSourceName = 'npmignore';
    const gitIgnoreSourceName = 'gitignore';
    const eslintIgnoreSourceName = 'eslintignore';
    const eslintRcSourceName = 'eslintrc.js';
    const dot = '.';
    const npmIgnoreDestName = dot + npmIgnoreSourceName;
    const gitIgnoreDestName = dot + gitIgnoreSourceName;
    const eslintIgnoreDestName = dot + eslintIgnoreSourceName;
    const eslintRcDestName = dot + eslintRcSourceName;
    const npmIgnoreSource = destRoot + npmIgnoreSourceName;
    const gitIgnoreSource = destRoot + gitIgnoreSourceName;
    const eslintIgnoreSource = destRoot + eslintIgnoreSourceName;
    const eslintRcSource = destRoot + eslintRcSourceName;
    const npmIgnoreDest = destRoot + npmIgnoreDestName;
    const gitIgnoreDest = destRoot + gitIgnoreDestName;
    const eslintIgnoreDest = destRoot + eslintIgnoreDestName;
    const eslintRcDest = destRoot + eslintRcDestName;

    setup(() => {
        consoleErrorStub = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
        generatorSourceRootStub = sandbox.stub(generatorStub, 'sourceRoot').callsFake(() => {
            return sourceRootBase;
        });
        generatorDestinationRootStub = sandbox.stub(generatorStub, 'destinationRoot').callsFake(() => {
            return destRoot;
        });
        generatorFsCopyTplStub = sandbox.stub(generatorStub.fs, 'copyTpl');
        generatorFsMoveStub = sandbox.stub(generatorStub.fs, 'move');
        pathJoinStub = sandbox.stub(path, 'join');
        pathResolveStub = sandbox.stub(path, 'resolve').callsFake(() => {
            return destRoot;
        });
    });
    teardown(() => {
        sandbox.restore();
    });

    /**
     * Contains unit tests for the scaffoldBoilerplateContent function.
     */
    // eslint-disable-next-line max-statements
    suite('scaffoldBoilerplateContent Tests:', () => {
        test('Should display an error message when the generator is null and the config is null', () => {
            boilerplate.scaffoldBoilerplateContent(null, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the config is undefined', () => {
            boilerplate.scaffoldBoilerplateContent(null, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the config is empty', () => {
            boilerplate.scaffoldBoilerplateContent(null, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the config is valid', () => {
            boilerplate.scaffoldBoilerplateContent(null, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the config is null', () => {
            boilerplate.scaffoldBoilerplateContent(undefined, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the config is undefined', () => {
            boilerplate.scaffoldBoilerplateContent(undefined, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the config is empty', () => {
            boilerplate.scaffoldBoilerplateContent(undefined, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the config is valid', () => {
            boilerplate.scaffoldBoilerplateContent(undefined, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the config is null', () => {
            boilerplate.scaffoldBoilerplateContent(generatorStub, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the config is undefined', () => {
            boilerplate.scaffoldBoilerplateContent(generatorStub, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the config is empty', () => {
            boilerplate.scaffoldBoilerplateContent(generatorStub, {});
            assert.isFalse(consoleErrorStub.called);
        });

        test('Should scaffold correct boilerplate content when generator and config are valid', () => {
            boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
            assert.isFalse(consoleErrorStub.called);
            assert.isTrue(generatorSourceRootStub.calledWith(pathHelpers.boilerplateRoot));
            assert.isTrue(generatorFsCopyTplStub.calledWith(sourceRoot, destRoot, extensionConfig));
        });

        test('Should set correct values on the config', () => {
            boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
            assert.deepEqual(extensionConfig.dot, true);
        });

        test('Should set correct destination root', () => {
            boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
            assert.isTrue(generatorDestinationRootStub.called);
            assert.isTrue(pathResolveStub.calledWith(destRoot));
        });

        test('Should scaffold git ignore file correctly', () => {
            pathJoinStub.onFirstCall().callsFake(() => {
                return gitIgnoreSource;
            });
            pathJoinStub.onSecondCall().callsFake(() => {
                return gitIgnoreDest;
            });

            boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
            assert.isTrue(pathJoinStub.firstCall.calledWith(destRoot, gitIgnoreSourceName));
            assert.isTrue(pathJoinStub.secondCall.calledWith(destRoot, gitIgnoreDestName));
            assert.isTrue(generatorFsMoveStub.calledWith(gitIgnoreSource, gitIgnoreDest));
        });

        test('Should scaffold npm ignore file correctly', () => {
            pathJoinStub.onFirstCall().callsFake(() => {
                return npmIgnoreSource;
            });
            pathJoinStub.onSecondCall().callsFake(() => {
                return npmIgnoreDest;
            });

            boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
            assert.isTrue(pathJoinStub.thirdCall.calledWith(destRoot, npmIgnoreSourceName));
            assert.isTrue(pathJoinStub.getCall(3).calledWith(destRoot, npmIgnoreDestName));
            assert.isTrue(generatorFsMoveStub.calledWith(npmIgnoreSource, npmIgnoreDest));
        });

        test('Should scaffold eslint ignore file correctly', () => {
            pathJoinStub.onFirstCall().callsFake(() => {
                return eslintIgnoreSource;
            });
            pathJoinStub.onSecondCall().callsFake(() => {
                return eslintIgnoreDest;
            });

            boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
            assert.isTrue(pathJoinStub.getCall(4).calledWith(destRoot, eslintIgnoreSourceName));
            assert.isTrue(pathJoinStub.getCall(5).calledWith(destRoot, eslintIgnoreDestName));
            assert.isTrue(generatorFsMoveStub.calledWith(eslintIgnoreSource, eslintIgnoreDest));
        });

        test('Should scaffold eslint RC file correctly', () => {
            pathJoinStub.onFirstCall().callsFake(() => {
                return eslintRcSource;
            });
            pathJoinStub.onSecondCall().callsFake(() => {
                return eslintRcDest;
            });

            boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
            assert.isTrue(pathJoinStub.getCall(6).calledWith(destRoot, eslintRcSourceName));
            assert.isTrue(pathJoinStub.getCall(7).calledWith(destRoot, eslintRcDestName));
            assert.isTrue(generatorFsMoveStub.calledWith(eslintRcSource, eslintRcDest));
        });
    });
});