'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import testHelpers = require('./../test-helpers');
import inputConfig = require('./../../../generators/app/input-config');
import chatbot = require('./../../../generators/app/chatbot');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in chatbot.ts
 */
suite('Chatbot Tests:', () => {
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

    suite('Chatbot Option Tests:', () => {
        const generatorRoot = path.join(__dirname, './../../../generators/app');
        const vstsAppName = 'vsts task';
        const appType = inputConfig.vstsTaskPromptValue;
        const appDescription = 'this is an awesome vsts task';
        const extensionConfig = { appName: vstsAppName, description: appDescription, appType: appType};
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new Chatbot ' +
            'project :( The Chatbot files were not added to the project.'

        test('Should display an error message when the generator is null and the extension config is null', () => {
            chatbot.scaffoldChatbotProject(null, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            chatbot.scaffoldChatbotProject(null, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            chatbot.scaffoldChatbotProject(null, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            chatbot.scaffoldChatbotProject(null, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            chatbot.scaffoldChatbotProject(undefined, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            chatbot.scaffoldChatbotProject(undefined, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            chatbot.scaffoldChatbotProject(undefined, {});
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            chatbot.scaffoldChatbotProject(undefined, extensionConfig);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            chatbot.scaffoldChatbotProject(generatorStub, null);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            chatbot.scaffoldChatbotProject(generatorStub, undefined);
            assert.isTrue(consoleErrorSpy.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            chatbot.scaffoldChatbotProject(generatorStub, {});
            assert.isFalse(consoleErrorSpy.called);
        });

        test('Should succeed when the generator is valid and the extension config is valid', () => {
            chatbot.scaffoldChatbotProject(generatorStub, extensionConfig);
            assert.isFalse(consoleErrorSpy.called);
        });
    });
});