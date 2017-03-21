'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import testHelpers = require('./../../test-helpers');
import inputConfig = require('./../../../generators/app/input-config');
import vsts = require('./../../../generators/app/vsts');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in vsts.ts
 */
suite('VSTS Project Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    const descriptionMessage = 'A new task to make a great platform even better';
    let consoleErrorSpy: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;

    setup(() => {
        consoleErrorSpy = sandbox.spy(console, 'error');
        generatorStub = testHelpers.generatorStub;
    });
    teardown(() => {
        sandbox.restore();
    });

    suite('VSTS Task Option Tests:', () => {
        const generatorRoot = path.join(__dirname, './../../../generators/app');
        const vstsAppName = 'vsts task';
        const appType = inputConfig.vstsTaskPromptValue;
        const appDescription = 'this is an awesome vsts task';
        const extensionConfig = { appName: vstsAppName, description: appDescription, appType: appType};
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new VSTS ' +
            'Task project :( The VSTS files were not added to the project.'

        test('Should display an error message when the generator is null and the extension config is null', () => {
            vsts.scaffoldVSTSTask(null, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            vsts.scaffoldVSTSTask(null, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            vsts.scaffoldVSTSTask(null, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            vsts.scaffoldVSTSTask(null, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            vsts.scaffoldVSTSTask(undefined, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            vsts.scaffoldVSTSTask(undefined, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            vsts.scaffoldVSTSTask(undefined, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            vsts.scaffoldVSTSTask(undefined, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            vsts.scaffoldVSTSTask(generatorStub, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            vsts.scaffoldVSTSTask(generatorStub, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            vsts.scaffoldVSTSTask(generatorStub, {});
            assert.isFalse(consoleErrorSpy.called);
        });

        test('Should succeed when the generator is valid and the extension config is valid', () => {
            vsts.scaffoldVSTSTask(generatorStub, extensionConfig);
            assert.isFalse(consoleErrorSpy.called);
        });
    });
});