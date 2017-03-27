'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import testHelpers = require('./../test-helpers');
import inputConfig = require('./../../../generators/app/input-config');
import express = require('./../../../generators/app/express');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in express.ts
 */
suite('Express Project Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    const descriptionMessage = 'A new task to make a great platform even better';
    let consoleErrorSpy: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;

    setup(() => {
        consoleErrorSpy = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
    });
    teardown(() => {
        sandbox.restore();
    });

    suite('Express API Option Tests:', () => {
        const generatorRoot = path.join(__dirname, './../../../generators/app');
        const vstsAppName = 'vsts task';
        const appType = inputConfig.vstsTaskPromptValue;
        const appDescription = 'this is an awesome vsts task';
        const extensionConfig = { appName: vstsAppName, description: appDescription, appType: appType};
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new Express ' +
            'API project :( The Express API files were not added to the project.'

        test('Should display an error message when the generator is null and the extension config is null', () => {
            express.scaffoldExpressApiProject(null, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            express.scaffoldExpressApiProject(null, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            express.scaffoldExpressApiProject(null, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            express.scaffoldExpressApiProject(null, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            express.scaffoldExpressApiProject(undefined, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            express.scaffoldExpressApiProject(undefined, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            express.scaffoldExpressApiProject(undefined, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            express.scaffoldExpressApiProject(undefined, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            express.scaffoldExpressApiProject(generatorStub, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            express.scaffoldExpressApiProject(generatorStub, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            express.scaffoldExpressApiProject(generatorStub, {});
            assert.isFalse(consoleErrorSpy.called);
        });

        test('Should succeed when the generator is valid and the extension config is valid', () => {
            express.scaffoldExpressApiProject(generatorStub, extensionConfig);
            assert.isFalse(consoleErrorSpy.called);
        });
    });
});