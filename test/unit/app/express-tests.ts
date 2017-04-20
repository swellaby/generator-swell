'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import express = require('./../../../generators/app/express');
import inputConfig = require('./../../../generators/app/input-config');
import pathHelpers = require('./../../../generators/app/path-helpers');
import testHelpers = require('./../test-helpers');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in express.ts
 */
suite('Express Project Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    let consoleErrorStub: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;
    let generatorLogStub: Sinon.SinonStub;
    let generatorSourceRootStub: Sinon.SinonStub;
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let generatorFsExtendJsonStub: Sinon.SinonStub;
    let generatorFsMoveStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    const sourceRootBase = 'templates/express';
    const sourceRoot = sourceRootBase + '/**/*';
    const destRoot = 'api';
    const packageJson = destRoot + '/package.json';

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
        generatorFsExtendJsonStub = sandbox.stub(generatorStub.fs, 'extendJSON');
        generatorFsMoveStub = sandbox.stub(generatorStub.fs, 'move');
        pathJoinStub = sandbox.stub(path, 'join');
    });

    teardown(() => {
        sandbox.restore();
    });

    suite('scaffoldExpressApiProject Tests:', () => {
        const extensionConfig = {
            appName: 'e',
            description: 'api',
            type: inputConfig.expressApiPromptValue,
            dot: false
        };
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new Express ' +
            'API project :( The Express API files were not added to the project.';
        const descriptionMessage = 'Super API underway';
        const dockerIgnoreSourceName = 'dockerignore';
        const dockerIgnoreDestName = '.' + dockerIgnoreSourceName;
        const dockerIgnoreSource = destRoot + dockerIgnoreSourceName;
        const dockerIgnoreDest = destRoot + dockerIgnoreDestName;

        test('Should display an error message when the generator is null and the extension config is null', () => {
            express.scaffoldExpressApiProject(null, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            express.scaffoldExpressApiProject(null, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            express.scaffoldExpressApiProject(null, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            express.scaffoldExpressApiProject(null, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            express.scaffoldExpressApiProject(undefined, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            express.scaffoldExpressApiProject(undefined, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            express.scaffoldExpressApiProject(undefined, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            express.scaffoldExpressApiProject(undefined, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            express.scaffoldExpressApiProject(generatorStub, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            express.scaffoldExpressApiProject(generatorStub, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            express.scaffoldExpressApiProject(generatorStub, {});
            assert.isFalse(consoleErrorStub.called);
            assert.isTrue(generatorLogStub.calledWith(yosay(descriptionMessage)));
        });

        test('Should scaffold express api content when generator and config are valid', () => {
            express.scaffoldExpressApiProject(generatorStub, extensionConfig);
            assert.isTrue(generatorSourceRootStub.firstCall.calledWith(pathHelpers.expressRoot));
            assert.isTrue(generatorFsCopyTplStub.firstCall.calledWith(
                sourceRoot,
                destRoot,
                extensionConfig
            ));
        });

        test('Should scaffold docker ignore file correctly', () => {
            pathJoinStub.onFirstCall().callsFake(() => {
                return dockerIgnoreSource;
            });
            pathJoinStub.onSecondCall().callsFake(() => {
                return dockerIgnoreDest;
            });

            express.scaffoldExpressApiProject(generatorStub, extensionConfig);
            assert.isTrue(pathJoinStub.firstCall.calledWith(destRoot, dockerIgnoreSourceName));
            assert.isTrue(pathJoinStub.secondCall.calledWith(destRoot, dockerIgnoreDestName));
            assert.isTrue(generatorFsMoveStub.calledWith(dockerIgnoreSource, dockerIgnoreDest));
        });

        test('Should add correct dependencies when the generator and config are valid', () => {
            pathJoinStub.callsFake(() => {
                return packageJson;
            });
            express.scaffoldExpressApiProject(generatorStub, extensionConfig);
            assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, {
                scripts: {
                    'docker-build': 'bash build.sh',
                    'start': 'node src/app.js'
                },
                dependencies: {
                    'express': '^4.14.0'
                },
                devDependencies: {
                    '@types/express': '^4.0.34'
                }
            }));
        });
    });
});