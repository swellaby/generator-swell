'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import boilerplate = require('./../../../generators/app/boilerplate');
import inputConfig = require('./../../../generators/app/input-config');
import testHelpers = require('./../test-helpers');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in boilerplate.ts
 */
suite('Boilerplate Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    const descriptionMessage = 'A new task to make a great platform even better';
    let consoleErrorSpy: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;
    const generatorRoot = path.join(__dirname, './../../../generators/app');
    const vstsAppName = 'vsts task';
    const appType = inputConfig.vstsTaskPromptValue;
    const appDescription = 'this is an awesome vsts task';
    const extensionConfig = { appName: vstsAppName, description: appDescription, appType: appType};
    const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to scaffold the ' +
        'boilerplate content :( The boilerplate files were not added to the project.'

    setup(() => {
        consoleErrorSpy = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
    });
    teardown(() => {
        sandbox.restore();
    });

    test('Should display an error message when the generator is null and the extension config is null', () => {
        boilerplate.scaffoldBoilerplateContent(null, null);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is null and the extension config is undefined', () => {
        boilerplate.scaffoldBoilerplateContent(null, undefined);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is null and the extension config is empty', () => {
        boilerplate.scaffoldBoilerplateContent(null, {});
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is null and the extension config is valid', () => {
        boilerplate.scaffoldBoilerplateContent(null, extensionConfig);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is undefined and the extension config is null', () => {
        boilerplate.scaffoldBoilerplateContent(undefined, null);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
        boilerplate.scaffoldBoilerplateContent(undefined, undefined);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is undefined and the extension config is empty', () => {
        boilerplate.scaffoldBoilerplateContent(undefined, {});
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is undefined and the extension config is valid', () => {
        boilerplate.scaffoldBoilerplateContent(undefined, extensionConfig);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });
    test('Should display an error message when the generator is valid and the extension config is null', () => {
        boilerplate.scaffoldBoilerplateContent(generatorStub, null);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should display an error message when the generator is valid and the extension config is undefined', () => {
        boilerplate.scaffoldBoilerplateContent(generatorStub, undefined);
        assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
    });

    test('Should succeed when the generator is valid and the extension config is empty', () => {
        boilerplate.scaffoldBoilerplateContent(generatorStub, {});
        assert.isFalse(consoleErrorSpy.called);
    });

    test('Should succeed when the generator is valid and the extension config is valid', () => {
        boilerplate.scaffoldBoilerplateContent(generatorStub, extensionConfig);
        assert.isFalse(consoleErrorSpy.called);
    });
});