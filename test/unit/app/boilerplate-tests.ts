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
    let consoleErrorSpy: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;
    const generatorRoot = path.join(__dirname, './../../../generators/app');
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
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;

    setup(() => {
        consoleErrorSpy = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
        generatorSourceRootStub = sandbox.stub(generatorStub, 'sourceRoot').callsFake(() => {
            return sourceRootBase;
        });
        generatorFsCopyTplStub = sandbox.stub(generatorStub.fs, 'copyTpl');
        generatorDestinationRootStub = sandbox.stub(generatorStub, 'destinationRoot').callsFake(() => {
            return destRoot;
        });
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