'use strict';

import Chai = require('chai');
import Q = require('q');
import Sinon = require('sinon');
import tl = require('vsts-task-lib/task');

import Helper = require('../../src/helper');
import main = require('../../src/main');

const assert = Chai.assert;

/**
 * Suite of tests for /src/main.ts
 */
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
    const inputMessageBase = 'You said: ';
    const sampleMessage = 'hello world';
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

    test('Should log out input of exampleMessageParameter when input is null', () => {
        taskLibGetInputStub.withArgs(exampleMessageParamName).returns(null);
        main.executeTask();
        assert.isTrue(consoleLogSpy.calledWith(inputMessageBase + null));
    });

    test('Should log out input of exampleMessageParameter when input is null', () => {
        taskLibGetInputStub.withArgs(exampleMessageParamName).returns(undefined);
        main.executeTask();
        assert.isTrue(consoleLogSpy.calledWith(inputMessageBase + undefined));
    });

    test('Should log out input of exampleMessageParameter when input is empty string', () => {
        taskLibGetInputStub.withArgs(exampleMessageParamName).returns('');
        main.executeTask();
        assert.isTrue(consoleLogSpy.calledWith(inputMessageBase + ''));
    });

    test('Should log out input of exampleMessageParameter when input is valid string', () => {
        taskLibGetInputStub.withArgs(exampleMessageParamName).returns(sampleMessage);
        main.executeTask();
        assert.isTrue(consoleLogSpy.calledWith(inputMessageBase + sampleMessage));
    });

    test('Should fail when both numeric input params are null', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns(null);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is a negative numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('-1');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is zero numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('0');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is a numeric decimal string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('1.2');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is null and B is a positive whole number string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(null);
        taskLibGetInputStub.withArgs(bParamName, true).returns('4');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is null', () => {
            taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
            taskLibGetInputStub.withArgs(bParamName, true).returns(null);

            main.executeTask();
            assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
            assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is a negative numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
        taskLibGetInputStub.withArgs(bParamName, true).returns('-1');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is zero numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
        taskLibGetInputStub.withArgs(bParamName, true).returns('0');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is a numeric decimal string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
        taskLibGetInputStub.withArgs(bParamName, true).returns('1.2');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is undefined and B is a positive whole number string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns(undefined);
        taskLibGetInputStub.withArgs(bParamName, true).returns('4');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is null', () => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('');
            taskLibGetInputStub.withArgs(bParamName, true).returns(null);

            main.executeTask();
            assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
            assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('');
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('');
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('');
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is a negative numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('');
        taskLibGetInputStub.withArgs(bParamName, true).returns('-1');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is zero numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('');
        taskLibGetInputStub.withArgs(bParamName, true).returns('0');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is a numeric decimal string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('');
        taskLibGetInputStub.withArgs(bParamName, true).returns('1.2');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is an empty string and B is a positive whole number string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('');
        taskLibGetInputStub.withArgs(bParamName, true).returns('4');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is null', () => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('ffdasfasdf');
            taskLibGetInputStub.withArgs(bParamName, true).returns(null);

            main.executeTask();
            assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
            assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('asdfasdf');
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('wersxxf');
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('asdfacse');
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is a negative numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('aefaf');
        taskLibGetInputStub.withArgs(bParamName, true).returns('-1');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is zero numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('adsaed');
        taskLibGetInputStub.withArgs(bParamName, true).returns('0');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is a numeric decimal string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('aewrdfd');
        taskLibGetInputStub.withArgs(bParamName, true).returns('1.2');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a non numeric string and B is a positive whole number string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('aeaderf');
        taskLibGetInputStub.withArgs(bParamName, true).returns('4');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a negative numeric string and B is null', () => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('-3');
            taskLibGetInputStub.withArgs(bParamName, true).returns(null);

            main.executeTask();
            assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
            assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a negative numeric string and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-10');
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a negative numeric string and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-7');
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a negative numeric string and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-40');
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should display the correct sum when numeric input param A is a negative numeric string and B is a negative numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('-4');
            taskLibGetInputStub.withArgs(bParamName, true).returns('-1');
            const x = -5;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
    });

    test('Should display the correct sum when numeric input param A is a negative numeric string and B is a zero numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('-4');
            taskLibGetInputStub.withArgs(bParamName, true).returns('0');
            const x = -4;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
    });

    test('Should display the correct sum when numeric input param A is a negative numeric string and B is a numeric decimal string',
        (done: () => void) => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-4');
        taskLibGetInputStub.withArgs(bParamName, true).returns('1.5');
        const x = -2.5;
        helperAddStub.returns(Q.resolve(x));

        main.executeTask().then(() => {
            assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
            done();
        });
    });

    test('Should display the correct sum when numeric input param A is a negative numeric string and B is a positive whole number string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('-4');
            taskLibGetInputStub.withArgs(bParamName, true).returns('10');
            const x = 6;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should fail when numeric input param A is a zero numeric string and B is null', () => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('-32');
            taskLibGetInputStub.withArgs(bParamName, true).returns(null);

            main.executeTask();
            assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
            assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a zero numeric string and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-17');
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a zero numeric string and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-6');
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a zero numeric string and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-40');
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should display the correct sum when numeric input param A is a zero numeric string and B is a negative numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('0');
            taskLibGetInputStub.withArgs(bParamName, true).returns('-11');
            const x = -11;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a zero numeric string and B is a zero numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('0');
            taskLibGetInputStub.withArgs(bParamName, true).returns('0');
            const x = 0;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a zero numeric string and B is a numeric decimal string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('0');
            taskLibGetInputStub.withArgs(bParamName, true).returns('3.5');
            const x = 3.5;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a zero numeric string and B is a positive whole number string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('0');
            taskLibGetInputStub.withArgs(bParamName, true).returns('104');
            const x = 104;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should fail when numeric input param A is a numeric decimal string and B is null', () => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('.03');
            taskLibGetInputStub.withArgs(bParamName, true).returns(null);

            main.executeTask();
            assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
            assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a numeric decimal string and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('.57');
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a numeric decimal string and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('-.6');
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a numeric decimal string and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('.40');
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should display the correct sum when numeric input param A is a numeric decimal string and B is a negative numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('.02');
            taskLibGetInputStub.withArgs(bParamName, true).returns('-11');
            const x = -10.8;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a numeric decimal string and B is a zero numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('0.8');
            taskLibGetInputStub.withArgs(bParamName, true).returns('0');
            const x = .8;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a numeric decimal string and B is a numeric decimal string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('1.5');
            taskLibGetInputStub.withArgs(bParamName, true).returns('3.5');
            const x = 5;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a numeric decimal string and B is a positive whole number string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('-103.5');
            taskLibGetInputStub.withArgs(bParamName, true).returns('104');
            const x = .5;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should fail when numeric input param A is a positive whole number string and B is null', () => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('1');
            taskLibGetInputStub.withArgs(bParamName, true).returns(null);

            main.executeTask();
            assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
            assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a positive whole number string and B is undefined', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('2');
        taskLibGetInputStub.withArgs(bParamName, true).returns(undefined);

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a positive whole number string and B is an empty string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('3');
        taskLibGetInputStub.withArgs(bParamName, true).returns('');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should fail when numeric input param A is a positive whole number string and B is a non numeric string', () => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('4');
        taskLibGetInputStub.withArgs(bParamName, true).returns('asdfdfa');

        main.executeTask();
        assert.deepEqual(taskLibDebugSpy.calledWith(invalidInputParamsDebugMessage), true);
        assert.deepEqual(taskLibErrorSpy.calledWith(invalidInputParamsErrorMessage), true);
        assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Failed, invalidInputResultErrorMessage), true);
    });

    test('Should display the correct sum when numeric input param A is a positive whole number string and B is a negative numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('5');
            taskLibGetInputStub.withArgs(bParamName, true).returns('-4');
            const x = 1;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a positive whole number string and B is a zero numeric string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('6');
            taskLibGetInputStub.withArgs(bParamName, true).returns('0');
            const x = 6;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when numeric input param A is a positive whole number string and B is a numeric decimal string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('7');
            taskLibGetInputStub.withArgs(bParamName, true).returns('2.25');
            const x = 9.25;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when both numeric inputs are a positive whole number string',
        (done: () => void) => {
            taskLibGetInputStub.withArgs(aParamName, true).returns('8');
            taskLibGetInputStub.withArgs(bParamName, true).returns('2');
            const x = 10;
            helperAddStub.returns(Q.resolve(x));

            main.executeTask().then(() => {
                assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
                assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
                done();
            });
        }
    );

    test('Should display the correct sum when the numeric inputs are prefixed with zeroes', (done: () => void) => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('008');
        taskLibGetInputStub.withArgs(bParamName, true).returns('002');
        const x = 10;
        helperAddStub.returns(Q.resolve(x));

        main.executeTask().then(() => {
            assert.deepEqual(consoleLogSpy.calledWith('The sum is: ' + x), true);
            assert.deepEqual(taskLibSetResultSpy.calledWith(tl.TaskResult.Succeeded, successfulAddResultMessage), true);
            done();
        });
    });

    test('Should display correct error message when helper addition returns an error', (done: () => void) => {
        taskLibGetInputStub.withArgs(aParamName, true).returns('1');
        taskLibGetInputStub.withArgs(bParamName, true).returns('2');
        helperAddStub.returns(Q.reject(new Error(helperFailedAddErrorMessage)));

        main.executeTask().then(() => {
            assert.deepEqual(consoleLogSpy.calledWith('The sum is: 3'), false);
            assert.deepEqual(taskLibErrorSpy.calledWith(failedAddErrorMessage), true);
            done();
        });
    });

    test('Should not attempt to retrieve team project count when there is an addition failure', (done: () => void) => {
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
