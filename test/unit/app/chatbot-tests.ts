'use strict';

import Chai = require('chai');
import path = require('path');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import chatbot = require('./../../../generators/app/chatbot');
import pathHelpers = require('./../../../generators/app/path-helpers');
import ProjectTypes = require('./../../../generators/app/project-types');
import testHelpers = require('./../test-helpers');

const assert = Chai.assert;

/**
 * Contains unit tests for the functions in chatbot.ts
 */
suite('Chatbot Tests:', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    let consoleErrorStub: Sinon.SinonSpy;
    let generatorStub: YeomanGenerator;
    let generatorLogStub: Sinon.SinonStub;
    let generatorSourceRootStub: Sinon.SinonStub;
    let generatorFsCopyTplStub: Sinon.SinonStub;
    let generatorDestinationRootStub: Sinon.SinonStub;
    let generatorFsExtendJsonStub: Sinon.SinonStub;
    let pathJoinStub: Sinon.SinonStub;
    const sourceRootBase = 'templates/chatbot';
    const sourceRoot = sourceRootBase + '/**/*';
    const destRoot = 'robot';
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
        pathJoinStub = sandbox.stub(path, 'join');
    });
    teardown(() => {
        sandbox.restore();
    });

    /**
     * Contains unit tests for the scaffoldChatbotProject function.
     */
    // eslint-disable-next-line max-statements
     suite('scaffoldChatbotProject Tests:', () => {
         const extensionConfig = {
            appName: 'a',
            description: 'abc',
            type: ProjectTypes[ProjectTypes.chatbot],
            dot: false
        };
        const invalidParamsErrorMessage = 'Oh no! Encountered an unexpected error while trying to create a new Chatbot ' +
            'project :( The Chatbot files were not added to the project.';
        const descriptionMessage = 'Engage users in new channels with a Chatbot';

        test('Should display an error message when the generator is null and the extension config is null', () => {
            chatbot.scaffoldChatbotProject(null, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is undefined', () => {
            chatbot.scaffoldChatbotProject(null, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is empty', () => {
            chatbot.scaffoldChatbotProject(null, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is null and the extension config is valid', () => {
            chatbot.scaffoldChatbotProject(null, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is null', () => {
            chatbot.scaffoldChatbotProject(undefined, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is undefined', () => {
            chatbot.scaffoldChatbotProject(undefined, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is empty', () => {
            chatbot.scaffoldChatbotProject(undefined, {});
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is undefined and the extension config is valid', () => {
            chatbot.scaffoldChatbotProject(undefined, extensionConfig);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });
        test('Should display an error message when the generator is valid and the extension config is null', () => {
            chatbot.scaffoldChatbotProject(generatorStub, null);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should display an error message when the generator is valid and the extension config is undefined', () => {
            chatbot.scaffoldChatbotProject(generatorStub, undefined);
            assert.isTrue(consoleErrorStub.calledWith(invalidParamsErrorMessage));
        });

        test('Should succeed when the generator is valid and the extension config is empty', () => {
            chatbot.scaffoldChatbotProject(generatorStub, {});
            assert.isFalse(consoleErrorStub.called);
            assert.isTrue(generatorLogStub.calledWith(yosay(descriptionMessage)));
        });

        test('Should scaffold the Chatbot content when the generator and config are valid', () => {
            chatbot.scaffoldChatbotProject(generatorStub, extensionConfig);
            assert.isTrue(generatorSourceRootStub.firstCall.calledWith(pathHelpers.chatbotRoot));
            assert.isTrue(generatorFsCopyTplStub.firstCall.calledWith(
                sourceRoot,
                destRoot,
                extensionConfig
            ));
        });

        test('Should add correct dependencies when the generator and config are valid', () => {
            pathJoinStub.callsFake(() => {
                return packageJson;
            });
            chatbot.scaffoldChatbotProject(generatorStub, extensionConfig);
            assert.isTrue(generatorDestinationRootStub.called);
            assert.isTrue(pathJoinStub.calledWith(destRoot));
            assert.isTrue(generatorFsExtendJsonStub.calledWith(packageJson, {
                dependencies: {
                    'botbuilder': '^3.4.4',
                    'restify': '^4.3.0'
                },
                devDependencies: {
                    '@types/restify': '^2.0.35'
                }
            }));
        });
    });
});