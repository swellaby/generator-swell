'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
// You need to do this prior to importing the core task lib to avoid the unccessary/undesireable
// actions it does internally on load/import.
import internal = require('vsts-task-lib/internal');
Sinon.stub(internal, '_loadData').callsFake(() => null);
import tl = require('vsts-task-lib/task');
import log = require('loglevel');

import task = require('../../../tasks/sample/task');
const assert = Chai.assert;

suite('<%= taskName %> Task Suite:', () => {
    let tlGetInputStub: Sinon.SinonStub;
    let tlDebugStub: Sinon.SinonStub;
    let tlSetResultStub: Sinon.SinonStub;
    let logInfoStub: Sinon.SinonStub;
    const inputMessage = 'Hello World!';
    const exampleMessageInputName = 'exampleMessage';
    const debugErrorMessagePrefix = 'Error message details: ';
    const taskFailedMessage = 'Task failed. See output for error info.';

    setup(() => {
        tlGetInputStub = Sinon.stub(tl, 'getInput').withArgs(exampleMessageInputName, true).callsFake(() => inputMessage);
        tlDebugStub = Sinon.stub(tl, 'debug');
        tlSetResultStub = Sinon.stub(tl, 'setResult');
        logInfoStub = Sinon.stub(log, 'info');
    });

    teardown(() => {
        Sinon.restore();
    });

    test('Should fail the task correctly when an error is thrown with error details', async () => {
        const errMessage = 'oops';
        tlGetInputStub.throws(new Error(errMessage));
        await task.run();
        assert.isTrue(tlDebugStub.calledWith(debugErrorMessagePrefix + errMessage));
        assert.isTrue(tlSetResultStub.calledWith(tl.TaskResult.Failed, taskFailedMessage));
    });

    test('Should fail the task correctly when an error is thrown without details', async () => {
        tlGetInputStub.throws(null);
        await task.run();
        assert.isTrue(tlDebugStub.calledWith(debugErrorMessagePrefix + 'unknown'));
        assert.isTrue(tlSetResultStub.calledWith(tl.TaskResult.Failed, taskFailedMessage));
    });

    test('Should display the correct output and pass the task when execution succeeds', async () => {
        await task.run();
        assert.isTrue(logInfoStub.calledWith('Your message was: ' + inputMessage));
        assert.isTrue(tlDebugStub.calledWith('This only displays when debugging is enabled on the build/release definintion'));
        assert.isTrue(tlSetResultStub.calledWith(tl.TaskResult.Succeeded, 'Passed!'));
    });
});