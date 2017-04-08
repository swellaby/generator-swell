'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import cli = require('./../../../generators/app/cli');
import inputConfig = require('./../../../generators/app/input-config');
import pathHelpers = require('./../../../generators/app/path-helpers');
import testHelpers = require('./../test-helpers');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in cli.ts
 */
suite('CLI Project Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    let consoleErrorSpy: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;
    let generatorLogStub: Sinon.SinonStub;

    setup(() => {
        consoleErrorSpy = sandbox.stub(console, 'error');
        generatorStub = testHelpers.generatorStub;
        generatorLogStub = sandbox.stub(generatorStub, 'log');
    });
    teardown(() => {
        sandbox.restore();
    });

    /**
     * Contains unit tests for the scaffoldCliProject function.
     */
    suite('scaffoldCliProject Tests:', () => {
        const extensionConfig = {
            appName: 'a',
            description: 'abc',
            type: inputConfig.cliPromptValue,
            dot: false
        };
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new CLI ' +
            'project :( The CLI files were not added to the project.';
        const descriptionMessage = 'New CLI coming... but not yet. The CLI Project is not yet supported';

        test('Should display an error message when the generator is null and the extension config is null', () => {
            cli.scaffoldCliProject(null, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            cli.scaffoldCliProject(null, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            cli.scaffoldCliProject(null, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            cli.scaffoldCliProject(null, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            cli.scaffoldCliProject(undefined, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            cli.scaffoldCliProject(undefined, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            cli.scaffoldCliProject(undefined, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            cli.scaffoldCliProject(undefined, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            cli.scaffoldCliProject(generatorStub, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            cli.scaffoldCliProject(generatorStub, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            cli.scaffoldCliProject(generatorStub, {});
            assert.isFalse(consoleErrorSpy.called);
            assert.isTrue(generatorLogStub.calledWith(yosay(descriptionMessage)));
        });

        test('Should succeed when the generator is valid and the extension config is valid', () => {
            cli.scaffoldCliProject(generatorStub, extensionConfig);
            assert.isFalse(consoleErrorSpy.called);
            assert.isTrue(generatorLogStub.calledWith(yosay(descriptionMessage)));
        });
    });
});