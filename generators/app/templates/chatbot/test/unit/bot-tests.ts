'use strict';

import Chai = require('chai');
import Sinon = require('sinon');

import builder = require('botbuilder');

import Bot = require('../../src/bot');

import SampleDialog = require('../../src/dialogs/sample');


const assert = Chai.assert;

suite('Bot Suite -', () => {
    let sut: Bot;
    let sandbox: Sinon.SinonSandbox;

    const univseralBot = {
        dialog: () => { } // tslint:disable-line
    };
    let recognizer: builder.LuisRecognizer; // tslint:disable-line
    const dialog = {
        onDefault: () => { }, // tslint:disable-line
        matches: () => { } // tslint:disable-line
    };
    let connector: builder.IConnector; // tslint:disable-line
    let sampleDialog: SampleDialog;

    let botStub: Sinon.SinonStub;
    let connectorStub: Sinon.SinonStub;
    let recognizerStub: Sinon.SinonStub;
    let dialogStub: Sinon.SinonStub;
    let rootDialogStub: Sinon.SinonStub;
    let dialogOnDefaultStub: Sinon.SinonStub;
    let dialogMatchStub: Sinon.SinonStub;

    let sampleRegStub: Sinon.SinonStub;

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
        sampleDialog = new SampleDialog();
        sampleRegStub = sandbox.stub(sampleDialog, 'register');
    };

    suiteSetup(() => {
        sandbox = Sinon.sandbox.create();
        setupStubs();
        sut = new Bot(sampleDialog);
    });

    suiteTeardown(() => {
        sandbox.restore();
        sut = null;
    });

    suite('initializeForConsole Tests -', () => {
        suiteSetup(() => {
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
            assert.isTrue(sampleRegStub.called);
            done();
        });

    });

    suite('initializeForWeb Tests -', () => {
        suiteSetup(() => {
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
            assert.isTrue(sampleRegStub.called);
            done();
        });
    });
});
