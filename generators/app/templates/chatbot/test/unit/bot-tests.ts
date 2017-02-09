'use strict';
/* tslint:disable:no-single-line-block-comment JSHint and ESLint need single line block comments */
/* jshint maxstatements:false */
// Disabled maxstatements jshint rule which errors due to
// the test functions being embedded within the suite functions.

// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* jshint quotmark:false */
/* eslint-disable quotes */
import Chai = require('chai');
import Sinon = require('sinon');
import builder = require('botbuilder');

import Bot = require('../../src/bot');
/* eslint-enable quotes */
/* jshint quotmark:true */

/* tslint:enable:no-single-line-block-comment -- Leave this line*/

const assert = Chai.assert;

/**
 * Contains Tests for Bot class
 */
suite('Bot Suite -', () => {
    let sut: Bot;
    let sandbox: Sinon.SinonSandbox;
    const univseralBot = {
        dialog: () => { return null }
    };
    const dialog = {
        onDefault: () => { return null; },
        matches: () => { return null; }
    };
    const recognizer: builder.LuisRecognizer = null;
    const connector: builder.IConnector = null;

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
        sandbox = Sinon.sandbox.create();
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
