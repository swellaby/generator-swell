'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import builder = require('botbuilder');

import Bot = require('../../src/bot');

const assert = Chai.assert;

/**
 * Contains Tests for Bot class
 */
suite('Bot Suite -', () => {
    let sut: Bot;
    const univseralBot = {
        dialog: () => null
    };
    const dialog = {
        onDefault: () => null,
        matches: () => null
    };
    const recognizer: builder.LuisRecognizer = null;
    const connector: builder.IConnector = null;
    const sandbox: Sinon.SinonSandbox = Sinon.createSandbox();
    let botStub: Sinon.SinonStub;
    let connectorStub: Sinon.SinonStub;
    let recognizerStub: Sinon.SinonStub;
    let dialogStub: Sinon.SinonStub;
    let rootDialogStub: Sinon.SinonStub;
    let dialogOnDefaultStub: Sinon.SinonStub;
    let dialogMatchStub: Sinon.SinonStub;

    const setupStubs = () => {
        botStub = sandbox.stub(builder, 'UniversalBot');
        recognizerStub = sandbox.stub(builder, 'LuisRecognizer');
        dialogStub = sandbox.stub(builder, 'IntentDialog');
        rootDialogStub = sandbox.stub(univseralBot, 'dialog');
        dialogOnDefaultStub = sandbox.stub(dialog, 'onDefault');
        dialogMatchStub = sandbox.stub(dialog, 'matches');
        botStub.returns(univseralBot);
        recognizerStub.returns(recognizer);
        dialogStub.returns(dialog);
    };

    setup(() => {
        setupStubs();
        sut = new Bot();
    });

    teardown(() => {
        sandbox.restore();
        sut = null;
    });

    suite('initializeForConsole Tests -', () => {
        setup(() => {
            connectorStub = sandbox.stub(builder, 'ConsoleConnector');
            connectorStub.returns(connector);
        });

        test('initializeForConsole calls required bot framework methods', (done: () => void) => {
            sut.initializeForConsole();
            assert.isTrue(botStub.called);
            assert.isTrue(connectorStub.called);
            assert.isTrue(recognizerStub.called);
            assert.isTrue(dialogStub.called);
            assert.isTrue(rootDialogStub.called);
            assert.isTrue(dialogOnDefaultStub.called);
            assert.isTrue(dialogMatchStub.called);
            done();
        });

        test('initializeForConsole registers all dialogs', (done: () => void) => {
            sut.initializeForConsole();
            assert.equal(rootDialogStub.callCount, 2);
            done();
        });

    });

    suite('initializeForWeb Tests -', () => {
        setup(() => {
            connectorStub = sandbox.stub(builder, 'ChatConnector');
            connectorStub.returns(connector);
        });

        test('initializeForWeb calls required bot framework methods', (done: () => void) => {
            sut.initializeForWeb();
            assert.isTrue(botStub.called);
            assert.isTrue(connectorStub.called);
            assert.isTrue(recognizerStub.called);
            assert.isTrue(dialogStub.called);
            assert.isTrue(rootDialogStub.called);
            assert.isTrue(dialogOnDefaultStub.called);
            assert.isTrue(dialogMatchStub.called);
            done();
        });

        test('initializeForWeb registers all dialogs', (done: () => void) => {
            sut.initializeForWeb();
            assert.equal(rootDialogStub.callCount, 2);
            done();
        });
    });
});
