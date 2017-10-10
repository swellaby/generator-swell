'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
// You need to do this prior to importing the core task lib to avoid the unccessary/undesireable
// actions it does internally on load/import.
import internal = require('vsts-task-lib/internal');
Sinon.stub(internal, '_loadData').callsFake(() => null);
import tl = require('vsts-task-lib/task');
import log = require('loglevel');

import Helper = require('../../../tasks/sampletask/helper');
import task = require('../../../tasks/sampletask/task');

const assert = Chai.assert;

/**
 * Suite of tests for the functions defined in ./src/task.ts
 */
suite('Task Suite: ', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    const exampleMessageInputKey = 'exampleMessage';
    const exampleMessage = 'Hello World!';
    const favoriteNumberKey = 'favoriteNumber';
    const favoriteNumberStr = '4';
    const favoriteNumber = parseFloat(favoriteNumberStr);
    const collectionUriVariableKey = 'System.TeamFoundationCollectionUri';
    const collectionUri = 'https://excellence.visualstudio.com/awesomeness';
    const accessTokenVariableKey = 'System.AccessToken';
    const accessToken = 'abcdefghijklmnopqrstuvwxyz';
    const numTeamProjects = 8;
    let helperGetTeamProjectsStub: Sinon.SinonStub;
    let tlGetInputStub: Sinon.SinonStub;
    let tlGetVariableStub: Sinon.SinonStub;
    let tlDebugStub: Sinon.SinonStub;
    let tlErrorStub: Sinon.SinonStub;
    let tlSetResultStub: Sinon.SinonStub;
    let logInfoStub: Sinon.SinonStub;
    const taskErrorMessageBase = 'Fatal error occurred.';
    const taskErrorMessageSuffixBase = ' Details: ';
    const taskErrorMessageDetail = 'Oops!';
    const taskErrorFullDeatilMessage = taskErrorMessageBase + taskErrorMessageSuffixBase + taskErrorMessageDetail;
    const taskFailedMessage = 'Task failed. See output for error info.';
    const exampleMessageDisplayPrefix = 'Your message was: ';
    const exampleMessageDisplay = exampleMessageDisplayPrefix + exampleMessage;
    const favoriteNumberDisplayPrefix = 'The product of your favorite number times 2 is: ';
    const favoriteNumberDisplay = favoriteNumberDisplayPrefix + (2 * favoriteNumber);
    // let logInfoStub2: Sinon.SinonStub;

    /**
     * Simple helper function to setup some stubs.
     */
    const setupInputAndVariableStubs = () => {
        tlGetInputStub = sandbox.stub(tl, 'getInput');
        tlGetInputStub.withArgs(exampleMessageInputKey, true).callsFake(() => exampleMessage);
        tlGetInputStub.withArgs(favoriteNumberKey, true).callsFake(() => favoriteNumberStr);
        tlGetVariableStub = sandbox.stub(tl, 'getVariable');
        tlGetVariableStub.withArgs(collectionUriVariableKey, true).callsFake(() => collectionUri);
        tlGetVariableStub.withArgs(accessTokenVariableKey, true).callsFake(() => accessToken);
        // logInfoStub2 = sandbox.stub(log, 'info');
    };

    setup(() => {
        setupInputAndVariableStubs();
        tlDebugStub = sandbox.stub(tl, 'debug');
        tlErrorStub = sandbox.stub(tl, 'error');
        tlSetResultStub = sandbox.stub(tl, 'setResult').callsFake(() => null);
        logInfoStub = sandbox.stub(log, 'info').callsFake(() => null);
        helperGetTeamProjectsStub = sandbox.stub(Helper.prototype, 'getNumTeamProjects').callsFake(() => numTeamProjects);
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Should correctly initialize parameters', async () => {
        await task.run();
        assert.isTrue(tlGetInputStub.calledWith(exampleMessageInputKey, true));
        assert.isTrue(tlGetInputStub.calledWith(favoriteNumberKey, true));
        assert.isTrue(tlGetVariableStub.calledWith(collectionUriVariableKey));
        assert.isTrue(tlGetVariableStub.calledWith(accessTokenVariableKey));
    });

    test('Should fail the task with correct error messages when inputs are invalid', async () => {
        tlGetInputStub.withArgs(exampleMessageInputKey, true).callsFake(() => { throw new Error(taskErrorMessageDetail); });
        await task.run();
        assert.isTrue(tlErrorStub.calledWith(taskErrorFullDeatilMessage));
        assert.isTrue(tlSetResultStub.calledWith(tl.TaskResult.Failed, taskFailedMessage));
    });

    test('Should fail the task with correct error messages when there is no exception detail', async () => {
        tlGetInputStub.withArgs(exampleMessageInputKey, true).callsFake(() => { throw new Error(); });
        await task.run();
        assert.isTrue(tlErrorStub.calledWith(taskErrorMessageBase));
        assert.isTrue(tlSetResultStub.calledWith(tl.TaskResult.Failed, taskFailedMessage));
    });

    test('Should still display input messages when helper call fails', async () => {
        helperGetTeamProjectsStub.callsFake(() => { throw new Error(taskErrorMessageDetail); });
        await task.run();
        assert.isTrue(logInfoStub.calledWith(exampleMessageDisplay));
        assert.isTrue(logInfoStub.calledWith(favoriteNumberDisplay));
        assert.isTrue(tlErrorStub.calledWith(taskErrorFullDeatilMessage));
        assert.isTrue(tlSetResultStub.calledWith(tl.TaskResult.Failed, taskFailedMessage));
    });

    test('Should pass the task with correct output message when all actions succeed', async () => {
        const successMessagePrefix = 'Your account has: ';
        const successMessageSuffix = ' team projects. Your task passed, hooray!';
        const successMessage = successMessagePrefix + numTeamProjects + successMessageSuffix;

        await task.run();
        assert.isTrue(logInfoStub.calledWith(exampleMessageDisplay));
        assert.isTrue(logInfoStub.calledWith(favoriteNumberDisplay));
        assert.isTrue(logInfoStub.calledWith(successMessage));
        assert.isTrue(tlDebugStub.calledWith('This only displays when debugging is enabled on the build/release definintion'));
        assert.isTrue(tlSetResultStub.calledWith(tl.TaskResult.Succeeded, successMessage));
    });
});
