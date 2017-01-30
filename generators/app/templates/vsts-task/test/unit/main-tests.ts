'use strict';

import Chai = require('chai');
import Q = require('q');
import Sinon = require('sinon');
import tl = require('vsts-task-lib/task');

import Helper = require('../../src/helper');
import main = require('../../src/main');

const assert = Chai.assert;

suite('Main Suite: ', () => {
    const sandbox: Sinon.SinonSandbox = Sinon.sandbox.create();
    let helperAddStub: Sinon.SinonStub;
    let helperGetTeamProjectsStub: Sinon.SinonStub;
    let taskLibGetInputStub: Sinon.SinonStub;
    let taskLibGetVariableStub: Sinon.SinonStub;
    let taskLibDebugSpy: Sinon.SinonSpy;
    let taskLibErrorSpy: Sinon.SinonSpy;
    let taskLibSetResultSpy: Sinon.SinonSpy;
    let consoleLogSpy: Sinon.SinonSpy;
    const exampleMessageParamName = 'exampleMessage';
    const aParamName = 'inputA';
    const bParamName = 'inputB';
    const invalidInputParamsDebugMessage = 'This message will show when debugging is enabled on the build/release.';
    const invalidInputParamsErrorMessage = 'Invalid inputs!';
    const invalidInputResultErrorMessage = 'Invalid parameters';
    const successfulAddResultMessage = 'Your task passed, hooray!';
    const failedAddBaseErrorMessage = 'Something failed! Error message: ';
    const helperFailedAddErrorMessage = 'Invalid params.';
    const failedAddErrorMessage = failedAddBaseErrorMessage + helperFailedAddErrorMessage;

    setup(() => {
        taskLibGetInputStub = sandbox.stub(tl, 'getInput');
        taskLibDebugSpy = sandbox.spy(tl, 'debug');
        taskLibErrorSpy = sandbox.spy(tl, 'error');
        taskLibSetResultSpy = sandbox.spy(tl, 'setResult');
        taskLibGetVariableStub = sandbox.stub(tl, 'getVariable').returns('doesn\'t really matter');
        helperAddStub = sandbox.stub(Helper.prototype, 'add');
        helperGetTeamProjectsStub = sandbox.stub(Helper.prototype, 'getNumTeamProjects');
        consoleLogSpy = sandbox.spy(console, 'log');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('Should fail when both numeric input params are null', function () {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns(null);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is undefined', function () {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is an empty string', function () {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is a non numeric string', function () {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should display correct sum when both input params are valid numbers', function (done) {
        taskLibGetInputStub.withArgs(aParamName, true).returns('1');
        taskLibGetInputStub.withArgs(bParamName, true).returns('2');
        helperAddStub.returns(Q.resolve(3));

        main.executeTask().then(() => {            
            assert.deepEqual(consoleLogSpy.calledWith('The sum is: 3'), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
            done();
        });  
    });

    test('Should display correct error message when helper addition returns an error', function (done) {
        taskLibGetInputStub.withArgs(aParamName, true).returns('1');
        taskLibGetInputStub.withArgs(bParamName, true).returns('2');
        helperAddStub.returns(Q.reject(new Error(helperFailedAddErrorMessage)));

        main.executeTask().then(() => {            
            assert.deepEqual(consoleLogSpy.calledWith('The sum is: 3'), false);
            assert.deepEqual(taskLibErrorSpy.calledWith(failedAddErrorMessage), true);
            done();
        });  
    });
});
